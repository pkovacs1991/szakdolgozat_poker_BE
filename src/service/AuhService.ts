import {Request} from 'express';
import {User} from "../entity/User";
import {getManager} from "typeorm";
import {UserRepository} from "../repository/UserRepository";
import {NotAuthenticatedException} from "../exception/NotAuthenticatedException";
import {NotAuthoreizedException} from "../exception/NotAuthorizedException";
import {encode,decode}  from 'jwt-simple'
import {UserService} from "./UserService";
import * as crypto from 'crypto-js';
export module AuthService {

    import checkForUniques = UserService.checkForUniques;

    export async function loginUser(req): Promise<User> {
        let userJSON = req.body;
        const userRepository = getManager().getRepository(User);
        userJSON.password = crypto.SHA256(userJSON.password).toString();
        let user = await userRepository.findOne(userJSON);
        if(user) {
            return (user);
        } else {
            return null;
        }
    }


    export async function currentUser(req) {
        const userRepository = getManager().getRepository(User);
        await isLoggedIn(req);
        const id = getIdByToken(req);
        let user = await userRepository.findOneById(id);
        return user;
    }

    export async function  registerUser(userJSON) {
        console.log(userJSON);
        const userRepository = getManager().getCustomRepository(UserRepository);

        let user = userRepository.createFromJson(userJSON);
        await checkForUniques(user);
        user.password = crypto.SHA256(user.password).toString();
        console.log(user);

        let newUser = await userRepository.save(user);
        console.log("User has been saved. User id is", newUser.id);
        return (newUser);

    }


    export async function  isAdminLoggedIn(req) {
        const userRepository = getManager().getRepository(User);
        await isLoggedIn(req);
        const id = getIdByToken(req);
        let loggedInUser = await userRepository.findOneById(id);

        if ( !loggedInUser.isAdmin) {
            throw new NotAuthoreizedException();
        }

    }

    export async function  isLoggedIn(req) {
        const id = getIdByToken(req);
        if(!id) {
            throw new NotAuthenticatedException();
        }

    }

    export function getIdByToken(req): number {
        const token = req.header('token');
        var decoded = decode(token, 'secret', true);
        console.log(decoded);
        console.log(decoded.id);
        return decoded.id;
    }


}


