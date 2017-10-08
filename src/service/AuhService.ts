import {User} from "../entity/User";
import {getManager} from "typeorm";
import {UserRepository} from "../repository/UserRepository";

export module  AuthService {

    export async function loginUser(userJSON) {
        const userRepository = getManager().getRepository(User);
        let user = await userRepository.find(userJSON);
        if(user.length == 1) {
            return ("Success");
        } else {
            return ("Fail");
        }
    }


    export async function  registerUser(userJSON) {
        const userRepository = getManager().getCustomRepository(UserRepository);
        let user = userRepository.createFromJson(userJSON);
        userRepository.save(user).then(user => {
            console.log("User has been saved. User id is", user.id);
            return ("ok");
        }).catch(error => {
            console.log(error);
            return ("error");
        });
    }

}


