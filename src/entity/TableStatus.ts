
import {Status} from "./Status";
import {User} from "./User";
import {Card} from "./Card";
import {Cards} from "./Cards";
import {PokerTable} from "./PokerTable";
import {Hand} from "./Hand";
import {UserBet} from "./UserBet";
import {PossibleRaiseAction} from "./PossibleRaiseAction";
import {Action} from "./Action";

export class TableStatus {

    status:Status;
    smallBlind:User;
    bigBlind: User;
    pot:number;
    currentBet: number;
    turn:User;
    users:User[];
    activeUsers:User[];
    cards: Cards;
    table: PokerTable;
    hand: Hand[];
    userBets: UserBet[] = [];
    tableCards: Card[] = [];
    possibleRaiseActions: PossibleRaiseAction[] = [];
    isEnd: boolean;


    constructor(smallBlind:User,
    bigBlind: User,
    turn:User,
    users:User[],
    table: PokerTable) {
        this.table = table;
        this.status = Status.PRE_FLOP;
        this.users = users.slice();
        this.activeUsers = users.slice();
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.currentBet = table.minBid * 2;
        this.turn = turn;
        this.pot = 0;
        this.cards = new Cards();
        this.deal();
        this.setBets();
        this.setPossibleRaiseActions();
        this.isEnd = false;

    }

    private deal() {
        this.hand = this.cards.deal(this.users);
    }

    private setBets() {
        this.setSmallBlind();
        this.setBigBlind();
        this.setOthers();
        this.pot = this.table.minBid *3;

    }

    private setSmallBlind() {
        const bet = new UserBet(this.smallBlind, this.table.minBid, this.table.minBid);
        this.userBets.push(bet);
    }

    private setBigBlind() {
        const bet = new UserBet(this.bigBlind, this.table.minBid * 2, this.table.minBid * 2);
        this.userBets.push(bet);
    }

    private setOthers() {

        for (let i = 0; i < this.users.length; i++) {
            if (this.isOther(this.users[i])) {

                const bet = new UserBet(this.users[i], 0, 0);
                this.userBets.push(bet);
            }
        }
    }

    private setPossibleRaiseActions() {
        this.possibleRaiseActions = [];
        for (let i = 0; i < this.activeUsers.length; i++) {
                const possibleRaiseAction = new PossibleRaiseAction(this.users[i],[Action.CALL,Action.RAISE]);
                this.possibleRaiseActions.push(possibleRaiseAction);

        }
    }

    removeUserFromUserAction(user: User) {
        for (let i = 0; i < this.possibleRaiseActions.length; i++) {
            if(user.id === this.possibleRaiseActions[i].user.id) {
                this.possibleRaiseActions.splice(i, 1);
                break;
            }
        }
    }

    private isOther(user: User) {
        return user.id != this.smallBlind.id && user.id != this.bigBlind.id;
    }

    doNextStatus() {
        if(this.status === Status.PRE_FLOP){
            this.doFlop();
        } else if(this.status === Status.FLOP) {
            this.doTurn();
        } else if(this.status === Status.TURN){
            this.doRiver();
        } else if(this.status === Status.RIVER) {
            this.evaluateWinner();
        }
    }

    doFlop() {
        this.status = Status.FLOP;
        this.tableCards = this.tableCards.concat(this.cards.flop());
        this.turn = this.smallBlind;
        this.setPossibleRaiseActions();

    }

    doTurn() {
        this.status = Status.TURN;
        this.tableCards = this.tableCards.concat(this.cards.turn());
        this.turn = this.smallBlind;
        this.setPossibleRaiseActions();

    }

    doRiver() {
        this.status = Status.RIVER;
        this.tableCards = this.tableCards.concat(this.cards.river());
        this.turn = this.smallBlind;
        this.setPossibleRaiseActions();

    }

    evaluateWinner() {

    }



}