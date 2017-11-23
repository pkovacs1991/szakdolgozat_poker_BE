import {Request} from 'express';
import {User} from "../entity/User";
import {getManager} from "typeorm";
import {AuthService} from "./AuhService";



export module  UserService {

    export async function getUser(id: number, req: Request) {
        const userRepository = getManager().getRepository(User);
        await AuthService.isAdminLoggedIn(req);
        let user = await userRepository.findOneById(id);
        return user;
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
        const userRepository = getManager().getRepository(User);
        await AuthService.isAdminLoggedIn(req);
        await userRepository.updateById(id, user)
            .then(a => response = true)
            .catch(err => {
                console.log(err);
                response = false;
            });

        return response;
    }


}