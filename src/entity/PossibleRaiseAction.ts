import {User} from "./User";
import {Card} from "./Card";
import {Action} from "./Action";

export class PossibleRaiseAction{

    user: User;
    actions: Action[];

    constructor(user: User, actions: Action[]) {
        this.user = user;
        this.actions = actions;
    }

}