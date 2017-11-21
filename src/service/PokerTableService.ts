import {PokerTable} from "../entity/PokerTable";
import {getManager} from "typeorm";
import {AuthService} from "./AuhService";
import {PokerTableRepository} from "../repository/PokerTableRepository";
import {UserRepository} from "../repository/UserRepository";
import {RecordNotFoundException} from "../exception/RecordNotFoundException";
import {User} from "../entity/User";



export module  PokerTableService {

   export async function getTables(req) {
        const pokerTableRepository = getManager().getRepository(PokerTable);
        AuthService.isLoggedIn(req);
        let pokerTable = await pokerTableRepository.find({relations: ["users"]});

        return pokerTable;
    }

   export async function getTable(id, req) {
        const pokerTableRepository = getManager().getRepository(PokerTable);
        AuthService.isLoggedIn(req);
        let pokerTable = await pokerTableRepository.findOneById(id, {relations: ["users"]});
        return pokerTable;
   }

    export async function createTable(pokerTableJSON, req) {
        const pokerTableRepository = getManager().getCustomRepository(PokerTableRepository);
        AuthService.isAdminLoggedIn(req);
        let pokerTable = pokerTableRepository.createFromJson(pokerTableJSON);
        pokerTable.users = new Array<User>();
        let newPokerTable = await pokerTableRepository.save(pokerTable);
        console.log("Poker Table has been creater. Poker table id is", newPokerTable.id);
        return (newPokerTable);
    }

    export async function updateTable(id, pokerTable, req) {
        let response;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        AuthService.isAdminLoggedIn(req);
        await pokerTableRepository.updateById(id, pokerTable)
            .then(a => response = true)
            .catch(err => {
                console.log(err);
                response = false;
            });


        return response;
    }


    export async function deletePokerTable(id, req) {
        let response = true;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        AuthService.isAdminLoggedIn(req);
        await pokerTableRepository.removeById(id)
            .then(a=>response = true)
            .catch(err => {
                console.log(err);
                response = false;
            });
        return response;
    }

    export async function joinTable(id, userJson, req) {
        let response = true;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        const userRepository = getManager().getRepository(User);
        AuthService.isLoggedIn(req);
        let pokerTable;
        await pokerTableRepository.findOneById(id, {relations: ["users"]})
            .then( success => {
                pokerTable = success;
                console.log(pokerTable);
            })
            .catch(err => {
                console.log(err);
                response = false;
            });
        let user;

        await userRepository.findOneById(userJson.id) .then( success => {
            user = success;
            console.log(user);
        })
            .catch(err => {
                console.log(err);
                response = false;
            });
        console.log(pokerTable);
        pokerTable.users.push(user);

        console.log('after set', pokerTable);

        await pokerTableRepository.save(pokerTable);



        return response;
    }


    export async function leaveTable(id, userJson, req) {
        let response = true;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        const userRepository = getManager().getRepository(User);
        AuthService.isLoggedIn(req);
        let pokerTable;
        await pokerTableRepository.findOneById(id, {relations: ["users"]})
            .then( success => {
                pokerTable = success;
                console.log(pokerTable);
            })
            .catch(err => {
                console.log(err);
                response = false;
            });
        let user;

        await userRepository.findOneById(userJson.id) .then( success => {
            user = success;
            console.log(user);
        })
            .catch(err => {
                console.log(err);
                response = false;
            });
        console.log(pokerTable);
        console.log(user);
        var index;
        for(var i = 0; i < pokerTable.users.length; i++ ) {
            if(pokerTable.users[i].id == user.id) {
                index = i;
                break;
            }
        }
        console.log('index of users',index);
        if (index > -1) {
            pokerTable.users.splice(index, 1);
        }

        console.log('after set', pokerTable);

        await pokerTableRepository.save(pokerTable);

        return response;

    }

}