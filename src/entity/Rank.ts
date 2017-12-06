
export enum Rank {

    HIGH_CARD = 'Legmagasabb lap',
    PAIR = 'Egy pár',
    TWO_PAIR = 'Két pár',
    THREE_OF_A_KIND = 'Drill',
    STRAIGHT = 'Sor',
    FLUSH = 'Szín',
    FULL_HOUSE = 'Full house',
    FOUR_OF_A_KIND = 'Póker',
    STRAIGHT_FLUSH = 'Szín sor',
    ROYAL_FLUSH = 'Royal Flush',
    EVERYONE_FOLD = 'mindenki bedobta',




}

export function getRankInNumber(rank: Rank): number {
    if (rank == Rank.HIGH_CARD) {
        return 1;
    } else if (rank == Rank.PAIR) {
        return 2;
    } else if (rank == Rank.TWO_PAIR) {
        return 3;
    } else if (rank == Rank.THREE_OF_A_KIND) {
        return 4;
    } else if (rank == Rank.STRAIGHT) {
        return 5;
    } else if (rank == Rank.FLUSH) {
        return 6;
    } else if (rank == Rank.FULL_HOUSE) {
        return 7;
    } else if (rank == Rank.FOUR_OF_A_KIND) {
        return 8;
    } else if (rank == Rank.STRAIGHT_FLUSH) {
        return 9;
    } else if (rank == Rank.ROYAL_FLUSH) {
        return 10;
    } else {
        return 0;
    }
}