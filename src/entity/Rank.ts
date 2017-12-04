
export enum Rank {

    HIGH_CARD = 'HIGH_CARD',
    PAIR = 'PAIR',
    TWO_PAIR = 'TWO_PAIR',
    THREE_OF_A_KIND = 'THREE_OF_A_KIND',
    STRAIGHT = 'STRAIGHT',
    FLUSH = 'FLUSH',
    FULL_HOUSE = 'FULL_HOUSE',
    FOUR_OF_A_KIND = 'FOUR_OF_A_KIND',
    STRAIGHT_FLUSH = 'STRAIGHT_FLUSH',
    ROYAL_FLUSH = 'ROYAL_FLUSH',





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