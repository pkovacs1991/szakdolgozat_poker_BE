import {Request} from 'express';
import {PokerTable} from "../entity/PokerTable";
import {getManager} from "typeorm";
import {AuthService} from "./AuhService";
import {PokerTableRepository} from "../repository/PokerTableRepository";
import {User} from "../entity/User";
import {PokerTableNotFoundException} from "../exception/PokerTableNotFoundException";



export module  PokerTableService {

   export async function getTables(req: Request) {
        const pokerTableRepository = getManager().getRepository(PokerTable);
        await AuthService.isLoggedIn(req);
        let pokerTable = await pokerTableRepository.find({relations: ["users"]});

        return pokerTable;
    }

   export async function getTable(id: number, req: Request) {
        const pokerTableRepository = getManager().getRepository(PokerTable);
        await AuthService.isLoggedIn(req);
        let pokerTable = await pokerTableRepository.findOneById(id, {relations: ["users"]});
        return pokerTable;
   }

    export async function createTable(pokerTableJSON: JSON, req: Request) {
        const pokerTableRepository = getManager().getCustomRepository(PokerTableRepository);
        await AuthService.isAdminLoggedIn(req);
        let pokerTable = pokerTableRepository.createFromJson(pokerTableJSON);
        pokerTable.users = new Array<User>();
        let newPokerTable = await pokerTableRepository.save(pokerTable);
        return (newPokerTable);
    }

    export async function updateTable(id: number, pokerTable: PokerTable, req: Request) {
        let response;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        await AuthService.isAdminLoggedIn(req);
        await pokerTableRepository.updateById(id, pokerTable)
            .then(a => response = true)
            .catch(err => {
                response = false;
            });


        return response;
    }


    export async function deletePokerTable(id: number, req: Request) {
        let response = true;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        await AuthService.isAdminLoggedIn(req);
        await pokerTableRepository.removeById(id)
            .then(a=>response = true)
            .catch(err => {
                response = false;
            });
        return response;
    }

    export async function joinTable(id: number, req: Request) {
        let response = true;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        await AuthService.isLoggedIn(req);
        let pokerTable;
        try {
            pokerTable = await getPokerTable(id);
        } catch(e) {
            if(e instanceof  PokerTableNotFoundException) {
                response = false;
            }
        }
        let user = await AuthService.currentUser(req);
        pokerTable.users.push(user);
        console.log(pokerTable);
        await pokerTableRepository.save(pokerTable);
        return response;
    }




    export async function leaveTable(id: number, req: Request) {
        let response = true;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        await AuthService.isLoggedIn(req);
        let pokerTable;
        try {
            pokerTable = await getPokerTable(id);
        } catch(e) {
            if(e instanceof  PokerTableNotFoundException) {
                response = false;
            }
        }

        let user = await AuthService.currentUser(req);
        pokerTable = removeUserFromTable(pokerTable, user);
        await pokerTableRepository.save(pokerTable);

        return response;

    }

    function removeUserFromTable(pokerTable: PokerTable, user: User) {
        var index;
        for (var i = 0; i < pokerTable.users.length; i++) {
            if (pokerTable.users[i].id == user.id) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            pokerTable.users.splice(index, 1);
        }
        return pokerTable;
    }

    async function getPokerTable(id: number) {
        const pokerTableRepository = getManager().getRepository(PokerTable);
        return await pokerTableRepository.findOneById(id, {relations: ["users"]})
            .then(table => {
                return table;
            })
            .catch(err => {
                throw new PokerTableNotFoundException();
            });
    }

}