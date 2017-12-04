import {User} from "./User";

export class UserBet{

    user: User;
    bet: number;
    currentBet: number;
    constructor(user: User, bet: number, currentBet: number) {
        this.user = user;
        this.bet = bet;
        this.currentBet = currentBet;
    }

}