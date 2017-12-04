import {Request} from 'express';
import {User} from "../entity/User";
import {getManager} from "typeorm";
import {AuthService} from "./AuhService";
import {NotAuthoreizedException} from "../exception/NotAuthorizedException";



export module  UserService {

    export async function getUser(id: number, req: Request) {
        const userRepository = getManager().getRepository(User);
        await AuthService.isAdminLoggedIn(req);
        let user = await userRepository.findOneById(id);
        return user;
    }


    export async function getUsers( req: Request) {
        const userRepository = getManager().getRepository(User);
        await AuthService.isAdminLoggedIn(req);
        let users = await userRepository.find();
        console.log(users);
        return users;
    }

    export async function deleteUser(id: number, req: Request) {
        let response;
        const userRepository = getManager().getRepository(User);
        await AuthService.isAdminLoggedIn(req);
        await userRepository.removeById(id)
              .then(a=>response = true)
              .catch(err => {
                  console.log(err);
                  response = false;
              });
       return response;
    }

    export async function modifyUser(id: number, user: User, req: Request) {
        let response;
        const loggedInUserId = AuthService.getIdByToken(req);
        const userRepository = getManager().getRepository(User);
        let loggedInUser = await userRepository.findOneById(loggedInUserId);

        if(id === loggedInUserId || loggedInUser.isAdmin) {
            await AuthService.isLoggedIn(req);
            await checkForUniques(user);
            await userRepository.updateById(id, user)
                .then(a => response = true)
                .catch(err => {
                    console.log('here comes the error', err);
                    response = false;
                });
        } else {
            throw new NotAuthoreizedException();
        }
        return response;
    }

    export async function checkForUniques(user: User) {
        const userRepository = getManager().getRepository(User);
        const usersUniqueUserName: User[] = await userRepository.find({username: user.username});
        const usersUniqueEmail: User[] = await userRepository.find({email: user.email});

    }


}