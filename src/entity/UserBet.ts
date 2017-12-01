import {User} from "./User";

export class UserBet{

    user: User;
    bet: number;

    constructor(user: User, bet: number) {
        this.user = user;
        this.bet = bet;
    }

}