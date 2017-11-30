
import {Status} from "./Status";
import {User} from "./User";
import {Card} from "./Card";
import {Cards} from "./Cards";
import {PokerTable} from "./PokerTable";
import {Hand} from "./Hand";

export class TableStatus {

    status:Status;
    smallBlind:User;
    bigBlind: User;
    pot:number;
    currentBet: number;
    turn:User;
    users:User[];
    cards: Cards;
    table: PokerTable;
    hand: Hand[];

    constructor(smallBlind:User,
    bigBlind: User,
    turn:User,
    users:User[],
    table: PokerTable) {
        this.table = table;
        this.status = Status.PRE_FLOP
        this.users = users;
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.currentBet = 0;
        this.turn = turn;
        this.pot = 0;
        this.cards = new Cards();
    }

}