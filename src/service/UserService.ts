import {User} from "../entity/User";
import {getManager} from "typeorm";
import {UserRepository} from "../repository/UserRepository";
import {NotAuthenticatedException} from "../exception/NotAuthenticatedException";
import {NotAuthoreizedException} from "../exception/NotAuthorizedException";



export module  UserService {

    export async function getUser(id, req) {
        const userRepository = getManager().getRepository(User);

        if(!req.session.userId) {
            throw new NotAuthenticatedException();
        }
        let loggedInUser = await userRepository.findOneById(req.session.userId);

        if (!loggedInUser.isAdmin) {
            throw new NotAuthoreizedException();
        }

        let user = await userRepository.findOneById(id);

        return user;
    }

    export async function deleteUser(id, req) {
        let response;
        const userRepository = getManager().getRepository(User);

        if(!req.session.userId) {
            throw new NotAuthenticatedException();
        }
        let loggedInUser = await userRepository.findOneById(req.session.userId);

        if ( !loggedInUser.isAdmin) {
            throw new NotAuthoreizedException();
        }
        await userRepository.removeById(id)
              .then(a=>response = true)
              .catch(err => {
                  console.log(err);
                  response = false;
              });
       return response;
    }

    export async function modifyUser(id, user, req) {
        let response;
        const userRepository = getManager().getRepository(User);
        if(!req.session.userId) {
            throw new NotAuthenticatedException();
        }
        let loggedInUser = await userRepository.findOneById(req.session.userId);


        if ( !loggedInUser.isAdmin && user.id != id) {
            throw new NotAuthoreizedException();
        }
        await userRepository.updateById(id, user)
            .then(a => response = true)
            .catch(err => {
                console.log(err);
                response = false;
            });

        return response;
    }


}