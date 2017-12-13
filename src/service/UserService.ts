import {Request} from 'express';
import {User} from "../entity/User";
import {getManager} from "typeorm";
import {AuthService} from "./AuhService";
import {NotAuthoreizedException} from "../exception/NotAuthorizedException";
import {UniqueConstraintException} from "../exception/UniqueConstraintException";
import {ErrorMessage} from "../entity/ErrorMessage";
import * as crypto from 'crypto-js';
import {NullConstraintException} from "../exception/NullConstraintException";
import {UserRepository} from "../repository/UserRepository";



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

    export async function modifyUser(id: number, user:User, req: Request) {
        let response;
        const loggedInUserId:number = AuthService.getIdByToken(req);
        await AuthService.isLoggedIn(req);
        const userRepository = getManager().getCustomRepository(UserRepository);
        let loggedInUser = await userRepository.findOneById(loggedInUserId);

        console.log(user);
        if(id == loggedInUserId || loggedInUser.isAdmin) {

            await checkForUniques(id, user);
            if(user.password === '') {
                user.password = loggedInUser.password;
            } else {
                user.password = crypto.SHA256(user.password).toString();
            }
            console.log('start');
            await checkForEmpty(user);
            console.log('end');
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


    export async function resetBalance(req: Request) {
        let response;

        await AuthService.isLoggedIn(req);
        const loggedInUserId = AuthService.getIdByToken(req);
        const userRepository = getManager().getRepository(User);
        let loggedInUser = await userRepository.findOneById(loggedInUserId);
        if (loggedInUser.balance < 500) {
            loggedInUser.balance = 500;
        }
        await userRepository.updateById(loggedInUser.id, loggedInUser)
            .then(a => response = true)
            .catch(err => {
                console.log('here comes the error', err);
                response = false;
            });

        return response;
    }



    export async function checkForUniques(id, user: User) {
        let errorMessage:ErrorMessage[] = [];
        const userRepository = getManager().getRepository(User);
        const usersUniqueUserName: User[] = await userRepository.find({username: user.username});
        console.log(id);
        console.log(usersUniqueUserName);
        const usersUniqueEmail: User[] = await userRepository.find({email: user.email});
        if (usersUniqueUserName.length === 1) {
            if(id != usersUniqueUserName[0].id) {
                errorMessage.push(new ErrorMessage('Ez a felhasználónév már foglalt'));
            }

        }

        if (usersUniqueEmail.length === 1) {
            if(id != usersUniqueEmail[0].id) {
                errorMessage.push(new ErrorMessage('Ez az e-mail cím már foglalt'));
            }

        }

        if( errorMessage.length > 0) {
            throw new UniqueConstraintException(JSON.stringify(errorMessage));
        }

    }


    export async function checkForEmpty(user: User) {
        let errorMessage:ErrorMessage[] = [];
        if (!user.username) {
                errorMessage.push(new ErrorMessage('Felhasználó név nem lehet üres'));
        }

        if (!user.password) {
            errorMessage.push(new ErrorMessage('Jelszó nem lehet üres'));
        }

        if (!user.email) {
            errorMessage.push(new ErrorMessage('E-mail cím nem lehet üres'));
        }

        if (!user.firstName) {
            errorMessage.push(new ErrorMessage('Keresztnév nem lehet üres'));
        }

        if (!user.lastName) {
            errorMessage.push(new ErrorMessage('Vezetéknév nem lehet üres'));
        }

        console.log(user);
        console.log(errorMessage);

        if( errorMessage.length > 0) {
            throw new NullConstraintException(JSON.stringify(errorMessage));
        }

    }


}