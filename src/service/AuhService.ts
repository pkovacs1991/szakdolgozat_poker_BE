import {User} from "../entity/User";
import {getManager} from "typeorm";
import {UserRepository} from "../repository/UserRepository";

export module  AuthService {

    export async function loginUser(req) {
        let userJSON = req.body;
        console.log(req.body);
        const userRepository = getManager().getRepository(User);
        let user = await userRepository.findOne(userJSON);
        if(user) {
            req.session.userId = user.id;
            return (user);
        } else {
            return ("Fail");
        }
    }


    export async function currentUser(req) {
        const userRepository = getManager().getRepository(User);
        let user = await userRepository.findOneById(req.session.userId);
        return user;
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


