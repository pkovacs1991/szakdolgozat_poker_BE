import {Request} from 'express';
import {PokerTable} from "../entity/PokerTable";
import {getManager} from "typeorm";
import {AuthService} from "./AuhService";
import {PokerTableRepository} from "../repository/PokerTableRepository";
import {User} from "../entity/User";
import {PokerTableNotFoundException} from "../exception/PokerTableNotFoundException";
import {ErrorMessage} from "../entity/ErrorMessage";
import {UniqueConstraintException} from "../exception/UniqueConstraintException";
import {NullConstraintException} from "../exception/NullConstraintException";



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
        await checkForUniques(0 ,pokerTable);
        await checkForEmpty( pokerTable);
        let newPokerTable = await pokerTableRepository.save(pokerTable);
        return (newPokerTable);
    }

    export async function updateTable(id: number, pokerTable: PokerTable, req: Request) {
        let response;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        await AuthService.isAdminLoggedIn(req);
        await checkForUniques(id, pokerTable);
        await checkForEmpty( pokerTable);
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
            let user = await AuthService.currentUser(req);
            pokerTable.users.push(user);
            console.log(pokerTable);
            await pokerTableRepository.save(pokerTable);
        } catch(e) {

                response = false;

        }

        return response;
    }




    export async function leaveTable(id: number, req: Request) {
        let response = true;
        const pokerTableRepository = getManager().getRepository(PokerTable);
        await AuthService.isLoggedIn(req);
        let pokerTable;
        try {
            pokerTable = await getPokerTable(id);
            let user = await AuthService.currentUser(req);
            pokerTable = removeUserFromTable(pokerTable, user);
            await pokerTableRepository.save(pokerTable);

        } catch(e) {

                response = false;

        }


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

    export async function checkForUniques(id, pokerTable: PokerTable) {
        let errorMessage:ErrorMessage[] = [];
        const pokerTableRepository = getManager().getRepository(PokerTable);
        const tablesUniqueTableName: PokerTable[] = await pokerTableRepository.find({name: pokerTable.name});
        if (tablesUniqueTableName.length === 1) {
            if(id != tablesUniqueTableName[0].id) {
                errorMessage.push(new ErrorMessage('Ez az asztal név már foglalt'));
            }

        }

        if( errorMessage.length > 0) {
            throw new UniqueConstraintException(JSON.stringify(errorMessage));
        }

    }

    export async function checkForEmpty(pokerTable: PokerTable) {
        let errorMessage:ErrorMessage[] = [];
        if (!pokerTable.name) {
            errorMessage.push(new ErrorMessage('Asztal név nem lehet üres'));
        }

        if (!pokerTable.minBid) {
            errorMessage.push(new ErrorMessage('Minimális emelés nem lehet üres'));
        }

        if (!pokerTable.maxBid) {
            errorMessage.push(new ErrorMessage('Maximális emelés nem lehet üres'));
        }

        if( errorMessage.length > 0) {
            throw new NullConstraintException(JSON.stringify(errorMessage));
        }

    }

}