import {Repository} from "typeorm";
import {EntityRepository} from "typeorm";
import {PokerTable} from "../entity/PokerTable";

/**
 * Second type of custom repository - extends standard repository.
 */
@EntityRepository(PokerTable)
export class PokerTableRepository extends Repository<PokerTable> {

    createFromJson(json) {
        let pokerTable = this.create();
        pokerTable.maxBid = json.maxBid;
        pokerTable.minBid = json.minBid;
        pokerTable.name = json.name;
        pokerTable.users = json.users;
        return pokerTable;
    }

}