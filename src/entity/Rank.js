"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rank;
(function (Rank) {
    Rank["HIGH_CARD"] = "HIGH_CARD";
    Rank["PAIR"] = "PAIR";
    Rank["TWO_PAIR"] = "TWO_PAIR";
    Rank["THREE_OF_A_KIND"] = "THREE_OF_A_KIND";
    Rank["STRAIGHT"] = "STRAIGHT";
    Rank["FLUSH"] = "FLUSH";
    Rank["FULL_HOUSE"] = "FULL_HOUSE";
    Rank["FOUR_OF_A_KIND"] = "FOUR_OF_A_KIND";
    Rank["STRAIGHT_FLUSH"] = "STRAIGHT_FLUSH";
    Rank["ROYAL_FLUSH"] = "ROYAL_FLUSH";
})(Rank = exports.Rank || (exports.Rank = {}));
function getRankInNumber(rank) {
    if (rank == Rank.HIGH_CARD) {
        return 1;
    }
    else if (rank == Rank.PAIR) {
        return 2;
    }
    else if (rank == Rank.TWO_PAIR) {
        return 3;
    }
    else if (rank == Rank.THREE_OF_A_KIND) {
        return 4;
    }
    else if (rank == Rank.STRAIGHT) {
        return 5;
    }
    else if (rank == Rank.FLUSH) {
        return 6;
    }
    else if (rank == Rank.FULL_HOUSE) {
        return 7;
    }
    else if (rank == Rank.FOUR_OF_A_KIND) {
        return 8;
    }
    else if (rank == Rank.STRAIGHT_FLUSH) {
        return 9;
    }
    else if (rank == Rank.ROYAL_FLUSH) {
        return 10;
    }
    else {
        return 0;
    }
}
exports.getRankInNumber = getRankInNumber;
