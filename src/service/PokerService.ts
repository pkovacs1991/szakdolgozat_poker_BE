import {TableStatus} from "../entity/TableStatus";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import {PokerTable} from "../entity/PokerTable";
import {getManager} from "typeorm";
import {AuthService} from "./AuhService";
import currentUser = AuthService.currentUser;
import {Action} from "../entity/Action";
import {PossibleRaiseAction} from "../entity/PossibleRaiseAction";
import {Status} from "../entity/Status";
import {EvaluateHandService} from "./EvaluateHandService";
import evaluateWinner = EvaluateHandService.evaluateWinner;
import {emptyCompilationResult} from "gulp-typescript/release/reporter";
import {ResultHand} from "../entity/ResultHand";
import {endianness} from "os";
import {isWorker} from "cluster";
import {Rank} from "../entity/Rank";

export class PokerService {

    dealer: number;
    tableStatus: TableStatus;
    users: User[] = [];
    isNew: boolean = false;
    tableId: number;
    constructor(tableId: number) {
        this.tableId = tableId;
    }

    async joinUser(user: User) {
        if(!this.isJoined(user)) {
            this.users.push(user);
        }

        if (this.users.length > 1) {
            if (this.users.length == 2 && !this.tableStatus) {

                await this.newGame(0, this.tableId);

            }
            this.tableStatus.message = user.username + ' joined';
            return JSON.stringify(this.tableStatus);
        } else {
            return JSON.stringify({message: "You should wait for another user"});
        }
    }


    async foldUser(user: User) {

       let users = this.tableStatus.activeUsers;
       for (let i = 0; i < users.length; i++) {
           if(user.id === users[i].id) {
               this.tableStatus.removeUserFromUserAction(user);
               users.splice(i, 1);
               break;
           }
       }

       if(users.length === 1) {
           return await this.endGame();

       } else if(!this.canAnyOneRaise()) {
           await this.nextStatus();
           this.tableStatus.message = user.username + ' bedobta a lapjait';
           return JSON.stringify(this.tableStatus);
       } else {
           this.nextUser();
           this.tableStatus.message = user.username + ' bedobta a lapjait';
           return JSON.stringify(this.tableStatus);
       }

    }

    async callUser(user: User) {
        const userRepository = getManager().getRepository(User);
        for(let i = 0; i < this.tableStatus.userBets.length; i++) {
            let userBet = this.tableStatus.userBets[i];
            if(userBet.user.id === user.id) {
                this.tableStatus.pot+= this.tableStatus.currentBet - userBet.currentBet;
                user.balance -= this.tableStatus.currentBet - userBet.currentBet;
                userBet.bet+= this.tableStatus.currentBet - userBet.currentBet;
                userBet.currentBet = this.tableStatus.currentBet;
                await userRepository.save(user);
            }
        }

        this.emptyUserAction(user);

        if(!this.canAnyOneRaise()) {
            let resultHand: string = await this.nextStatus();
            if (resultHand) {
                return resultHand;
            }
        } else {
            this.nextUser();
        }
        this.tableStatus.message = user.username + ' megadta az emelést';
        return JSON.stringify(this.tableStatus);
    }

    async raiseUser(user: User, amount: number) {
        const userRepository = getManager().getRepository(User);
        for(let i = 0; i < this.tableStatus.userBets.length; i++) {
            let userBet = this.tableStatus.userBets[i];
            if(userBet.user.id === user.id) {

                this.tableStatus.pot+=  +amount;
                user.balance -= +amount;
                userBet.bet+= +amount;
                this.tableStatus.currentBet = +amount + userBet.currentBet;
                userBet.currentBet += +amount;
                await userRepository.save(user);
            }
        }

        this.setCallUsersAction(user);

        this.nextUser();
        this.tableStatus.message = user.username + ' emelte a tétet ' + amount + ' összeggel';
        return JSON.stringify(this.tableStatus);
    }


    async checkUser(user: User) {

        this.emptyUserAction(user);
        if(!this.canAnyOneRaise()) {
            let resultHand: string = await this.nextStatus();
            if (resultHand) {
                return resultHand;
            }
        } else {
            this.nextUser();
        }
        this.tableStatus.message = user.username + ' passzolt (Check)';
        return JSON.stringify(this.tableStatus);
    }

    private emptyUserAction(user: User) {
        let possibleRaiseActions = this.tableStatus.possibleRaiseActions;
        for (let i = 0; i < possibleRaiseActions.length; i++) {
            if(user.id === possibleRaiseActions[i].user.id) {

                possibleRaiseActions[i].actions = [];
                break;
            }
        }
    }

    private setCallUsersAction(user: User) {
        this.emptyUserAction(user);
        let possibleRaiseActions = this.tableStatus.possibleRaiseActions;
        for (let i = 0; i < possibleRaiseActions.length; i++) {
            if(user.id !== possibleRaiseActions[i].user.id) {
                this.addRaiseOption(possibleRaiseActions[i],Action.CALL);
            }
        }
    }

    private addRaiseOption(possibleRaiseAction: PossibleRaiseAction, action: Action) {
        let containAction: boolean = false;
        for(let i = 0; i < possibleRaiseAction.actions.length; i++) {
            if(possibleRaiseAction.actions[i] === action) {
                containAction = true;
            }
        }
        if (!containAction) {
            possibleRaiseAction.actions.push(action);
        }
    }

    private canAnyOneRaise(): boolean {
        let canRaise = false;
        let possibleRaiseActions = this.tableStatus.possibleRaiseActions;
        for (let i = 0; i < possibleRaiseActions.length; i++) {
            if(possibleRaiseActions[i].actions.length > 0) {
                canRaise = true;
                break;
            }
        }

        return canRaise;
    }

    private nextUser() {
        let users = this.tableStatus.activeUsers;
        for (let i = 0; i < users.length; i++) {
            if(this.tableStatus.turn.id === users[i].id) {
                this.tableStatus.turn = users[this.nextActiveIndex(i)];
                break;
            }
        }
    }

    private nextActiveIndex(index: number): number {

        return index + 1 < this.tableStatus.activeUsers.length ? index + 1 : 0;
    }

    private nextIndex(index: number): number {
        return index + 1 < this.users.length ? index + 1 : 0;
    }


    async nextStatus() {
        if(this.tableStatus.status === Status.RIVER) {
           return await this.endGame();
        } else {
            this.tableStatus.doNextStatus();
        }
    }


    async newGame(dealer: number, tableId: number) {

        const pokerTableRepository = getManager().getRepository(PokerTable);
        let table = await pokerTableRepository.findOneById(tableId);
        this.dealer = dealer;
        const smallBlindIndex = this.nextIndex(dealer);
        const bigBlindIndex = this.nextIndex(smallBlindIndex);
        const turnIndex = this.nextIndex(bigBlindIndex);

        this.tableStatus = new TableStatus(
            this.users[smallBlindIndex],
            this.users[bigBlindIndex],
            this.users[turnIndex],
            this.users,
            table
        );


    }

    async endGame() {
        let winners: ResultHand[] = [];
        if (this.tableStatus.activeUsers.length == 1) {
            let resultHand:ResultHand = new ResultHand(Rank.EVERYONE_FOLD,[]);
            resultHand.user = this.tableStatus.activeUsers[0];
            winners.push(resultHand);
        } else {
            const resultHand: ResultHand[] = evaluateWinner(this.tableStatus.hand, this.tableStatus.tableCards);

            for(let i = 0; i < resultHand.length; i++) {
                winners.push(resultHand[i]);
            }
        }

       await this.handleMoney(winners);
       this.tableStatus.isEnd = true;
        console.log(winners);
       return JSON.stringify({winner: winners});

    }

    private async handleMoney(winners: ResultHand[]) {
        const userRepository = getManager().getRepository(User);
        for(let i = 0; i < this.tableStatus.users.length; i++) {
            let user = this.tableStatus.users[i];
                const userBet = this.getUserBet(user);
                user.balance = user.balance - userBet;
                await userRepository.save(user);

        }
        let winPot:number = Math.floor(this.tableStatus.pot / winners.length);
        for(let i = 0; i < winners.length; i++) {
            let user: User = winners[i].user;
            user.balance += winPot;
            await userRepository.save(user);
        }
    }

    private getUserBet(user: User): number {
        let userBet = 0;
        for(let i = 0; i < this.tableStatus.userBets.length; i++) {
            if(this.tableStatus.userBets[i].user.id == user.id) {
                userBet = this.tableStatus.userBets[i].bet;
            }
        }
        return userBet;
    }

    async handleMessage(message: Message) {

        let content: string;
        let contentJSON = JSON.parse(message.content);
        if(contentJSON.action === 'JOINED') {
            content = await this.joinUser(message.from);
        } else if(contentJSON.action === 'FOLD') {
            console.log('call fold')
            content = await this.foldUser(message.from);
            if (this.tableStatus.isEnd) {

                await this.newGame(this.nextIndex(this.dealer), this.tableId);
                this.isNew = true;
            }

        } else if(contentJSON.action === 'CHECK') {
            console.log('call check')
            content = await this.checkUser(message.from);
            if (this.tableStatus.isEnd) {

                await this.newGame(this.nextIndex(this.dealer), this.tableId);
                this.isNew = true;
            }

        } else if(contentJSON.action === 'CALL') {
            console.log('call call')
            content = await this.callUser(message.from);
            if (this.tableStatus.isEnd) {

                await this.newGame(this.nextIndex(this.dealer), this.tableId);
                this.isNew = true;
            }

        } else if(contentJSON.action === 'RAISE') {
            console.log('call raise' + message.from.username);
            content = await this.raiseUser(message.from, contentJSON.amount);

        } else if(contentJSON.action === 'CHAT') {
            console.log('call CHAT' + message.from.username);
            content = JSON.stringify({message: message.from.username + ": " + contentJSON.message});

        } else {
            content = JSON.stringify({message: 'bad message'})
        }


        return new Message(message.from, content);
    }


    isJoined(user: User) : boolean {
        let isJoined = false;

        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i] && this.users[i].id === user.id) {
                isJoined = true;
            }
        }
        return isJoined;
    }

}