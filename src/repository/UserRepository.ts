import {Repository} from "typeorm";
import { User} from "../entity/User";
import {EntityRepository} from "typeorm";

/**
 * Second type of custom repository - extends standard repository.
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    createFromJson(json) {
        let user = this.create();
        user.username = json.username;
        user.password = json.password;
        user.firstName = json.firstName;
        user.lastName = json.lastName;
        user.email = json.email;
        user.balance = 500;
        user.isAdmin = false;
        return user;
    }

}