import {User} from "../entity/User";
import {getManager} from "typeorm";
import {UserRepository} from "../repository/UserRepository";
import {NotAuthenticatedException} from "../exception/NotAuthenticatedException";
import {NotAuthoreizedException} from "../exception/NotAuthorizedException";

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
        let newUser = await userRepository.save(user);
        console.log("User has been saved. User id is", newUser.id);
        return (newUser);

    }


    export async function  isAdminLoggedIn(req) {
        const userRepository = getManager().getRepository(User);
        if(!req.session.userId) {
            throw new NotAuthenticatedException();
        }
        let loggedInUser = await userRepository.findOneById(req.session.userId);


        if ( !loggedInUser.isAdmin) {
            throw new NotAuthoreizedException();
        }

    }

    export async function  isLoggedIn(req) {
        const userRepository = getManager().getRepository(User);
        if(!req.session.userId) {
            throw new NotAuthenticatedException();
        }

    }

    export async function  logoutUser(req) {
        req.session.userId = null;
    }

}


