
import {User} from "./User";
import {Card} from "./Card";

export class Hand{

    user:User;
    cards:Card[];

    constructor(user: User, cards: Card[]) {
        this.user = user;
        this.cards = cards;
    }

}