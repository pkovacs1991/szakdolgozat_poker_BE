import {TableStatus} from "../entity/TableStatus";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import {PokerTable} from "../entity/PokerTable";
import {getManager} from "typeorm";

export class PokerService {

    dealer: number;
    tableStatus: TableStatus;
    users: User[] = [];
    isNew: boolean = false;
    constructor() {

    }

    async joinUser(user: User) {
        if(!this.isJoined(user)) {
            this.users.push(user);
        }

        if (this.users.length > 1) {
            if (this.users.length == 2 && !this.tableStatus) {
                const tableId = 4

                await this.newGame(0, tableId);

            }
            return JSON.stringify(this.tableStatus);
        } else {
            return JSON.stringify({message: "You should wait for another user"});
        }
    }


    async foldUser(user: User) {
       this.nextUser();
       let users = this.tableStatus.activeUsers;
       for (let i = 0; i < users.length; i++) {
           if(user.id === users[i].id) {
               users.splice(i, 1);
               break;
           }
       }
       console.log('ussserrres',this.users);
       if(users.length === 1) {
           return await this.endGame();
       } else {

           return JSON.stringify(this.tableStatus);
       }

    }

    private nextUser() {
        let users = this.tableStatus.activeUsers;
        for (let i = 0; i < users.length; i++) {
            if(this.tableStatus.turn.id === users[i].id) {
                this.tableStatus.turn = users[this.nextActiveIndex(i)];
            }
        }
    }

    private nextActiveIndex(index: number): number {
        return index + 1 < this.tableStatus.activeUsers.length ? index + 1 : 0;
    }

    private nextIndex(index: number): number {
        return index + 1 < this.users.length ? index + 1 : 0;
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
        let winner;
        if (this.tableStatus.activeUsers.length == 1) {
            winner = this.tableStatus.activeUsers[0];
        }

       await this.handleMoney(winner);
       this.tableStatus.isEnd = true;
       return JSON.stringify({winner: winner});

    }

    private async handleMoney(winner: User) {
        const userRepository = getManager().getRepository(User);
        for(let i = 0; i < this.tableStatus.users.length; i++) {
            let user = this.tableStatus.users[i];
            if(user.id != winner.id) {
                const userBet = this.getUserBet(user);
                user.balance = user.balance - userBet;
                await userRepository.save(user);

            }
        }
        let user: User = winner;
        user.balance += this.tableStatus.pot;
        await userRepository.save(user);
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
        console.log(contentJSON.action);
        if(contentJSON.action === 'JOINED') {
            content = await this.joinUser(message.from);
        }
        else if(contentJSON.action === 'FOLD') {
            console.log('call fold')
            content = await this.foldUser(message.from);
            if (this.tableStatus.isEnd) {

                await this.newGame(this.nextIndex(this.dealer),4 );
                this.isNew = true;
            }
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