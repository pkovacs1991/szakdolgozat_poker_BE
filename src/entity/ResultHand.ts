import {Rank} from "./Rank";
import {Card} from "./Card";
import {User} from "./User";

export class ResultHand {

    rank: Rank;
    cards: Card[];
    user: User;
    constructor(rank: Rank, cards: Card[]) {
        this.rank = rank;
        this.cards = cards;


    }
}