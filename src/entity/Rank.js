"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rank;
(function (Rank) {
    Rank["HIGH_CARD"] = "Legmagasabb lap";
    Rank["PAIR"] = "Egy p\u00E1r";
    Rank["TWO_PAIR"] = "K\u00E9t p\u00E1r";
    Rank["THREE_OF_A_KIND"] = "Drill";
    Rank["STRAIGHT"] = "Sor";
    Rank["FLUSH"] = "Sz\u00EDn";
    Rank["FULL_HOUSE"] = "Full house";
    Rank["FOUR_OF_A_KIND"] = "P\u00F3ker";
    Rank["STRAIGHT_FLUSH"] = "Sz\u00EDn sor";
    Rank["ROYAL_FLUSH"] = "Royal Flush";
    Rank["EVERYONE_FOLD"] = "mindenki bedobta";
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
