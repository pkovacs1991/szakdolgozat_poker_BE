
import {TableStatus} from "../entity/TableStatus";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import {PokerTable} from "../entity/PokerTable";
import {getManager} from "typeorm";

export class PokerService {


    tableStatus: TableStatus;
    users: User[] = [];

    constructor() {

    }

    async joinUser(user: User) {
        if(!this.isJoined(user)) {
            this.users.push(user);
        }

        if (this.users.length > 1) {
            const pokerTableRepository = getManager().getRepository(PokerTable);
            let table = await pokerTableRepository.findOneById(4);
            console.log(table);
            this.tableStatus = new TableStatus(
                this.users[0],
                this.users[1],
                this.users[0],
                this.users,
                table
            );
            console.log('helloooooooooooo');
            console.log(this.tableStatus);
            return JSON.stringify(this.tableStatus);
        } else {
            return JSON.stringify({message: "You should wait for another user"});
        }
    }



    async handleMessage(message: Message) {

        let content: string;
        let contentJSON = JSON.parse(message.content);

        if(contentJSON.action === 'JOINED') {
            content = await this.joinUser(message.from);
        }


        return new Message(message.from, content);
    }


    isJoined(user: User) : boolean {
        let isJoined = false;

        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i] && this.users[i].id === user.id) {
                isJoined = true;
            }
        }
        return isJoined;
    }

}