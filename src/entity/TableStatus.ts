
import {Status} from "./Status";
import {User} from "./User";
import {Card} from "./Card";
import {Cards} from "./Cards";
import {PokerTable} from "./PokerTable";
import {Hand} from "./Hand";
import {UserBet} from "./UserBet";

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
    tableCards: Card[];
    isEnd: boolean;


    constructor(smallBlind:User,
    bigBlind: User,
    turn:User,
    users:User[],
    table: PokerTable) {
        this.table = table;
        this.status = Status.PRE_FLOP
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
        const bet = new UserBet(this.smallBlind, this.table.minBid);
        this.userBets.push(bet);
    }

    private setBigBlind() {
        const bet = new UserBet(this.bigBlind, this.table.minBid * 2);
        this.userBets.push(bet);
    }

    private setOthers() {

        for (let i = 0; i < this.users.length; i++) {
            if (this.isOther(this.users[i])) {

                const bet = new UserBet(this.users[i], 0);
                this.userBets.push(bet);
            }
        }
    }

    private isOther(user: User) {
        return user.id != this.smallBlind.id && user.id != this.bigBlind.id;
    }



}