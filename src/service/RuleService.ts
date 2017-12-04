import {Card} from "../entity/Card";
import {ResultHand} from "../entity/ResultHand";
import {Rank} from "../entity/Rank";

export module RuleService {


    export function hasRoyalFlush(cards: Card[]): ResultHand {
        const coloredCards = getLongestColoredCards(cards);
        let resultHand = null;
        if (coloredCards.length >= 5) {
            const straight: Card[] = getStraight(coloredCards);

            const straightFlush: Card[] = getFlushInStraight(straight);
            if (straightFlush.length >= 5 && straightFlush[straightFlush.length - 1].number === 'Ace') {
                resultHand = new ResultHand(Rank.ROYAL_FLUSH, straightFlush.slice(straightFlush.length - 5));

            }
        }
        return resultHand;

    }


    export function hasStraightFlush(cards: Card[]): ResultHand {
        let resultHand = null;
        const coloredCards = getLongestColoredCards(cards);
        if (coloredCards.length >= 5) {

            const straight: Card[] = getStraight(coloredCards);

            const straightFlush: Card[] = getFlushInStraight(straight);
            if (straightFlush.length >= 5) {
                resultHand = new ResultHand(Rank.STRAIGHT_FLUSH, straightFlush.slice(straightFlush.length - 5));

            }
        }
        return resultHand;
    }


    export function getFlushInStraight(cards: Card[]) {
        let straight = [];
        straight = getStraightFlushFromIndex(0, cards);
        if (straight.length === 0) {
            straight = getStraightFlushFromIndex(1, cards);
        }
        if (straight.length === 0) {
            straight = getStraightFlushFromIndex(2, cards);
        }

        return straight;
    }


    export function getStraightFlushFromIndex(firstIndex: number, cards: Card[]): Card[] {
        let straight = [];
        for (let i = firstIndex; i < cards.length - 1; i++) {

            let card1Color = cards[i].color;

            let card2Color = cards[i + 1].color;
            if (card1Color === card2Color) {
                if (i === firstIndex) {
                    straight.push(cards[i])
                }
                straight.push(cards[i + 1]);
            } else {
                break;
            }
        }
        return straight;
    }

    export function hasStraight(cards: Card[]): ResultHand {
        let resultHand: ResultHand = null
        const straight = getStraight(cards);

        if (straight.length >= 5) {
            resultHand = new ResultHand(Rank.STRAIGHT, straight.slice(straight.length - 5));
        }

        return resultHand;
    }


    export function getStraight(cards: Card[]): Card[] {
        let orderedCards: Card[] = orderCards(cards);
        let orderedCardsAceOne: Card[] = orderCardsAceOne(cards);
        let straight: Card[] = calculateStraight(orderedCards);
        if (straight.length < 5) {
            straight = calculateStraight(orderedCardsAceOne);
        }
        return straight;
    }


    export function calculateStraight(cards: Card[]): Card[] {
        let straight = [];
        straight = getStraightFromIndex(0, cards);
        if (straight.length < 5) {
            straight = getStraightFromIndex(1, cards);
        }
        if (straight.length < 5) {
            straight = getStraightFromIndex(2, cards);
        }

        return straight;
    }

    export function getStraightFromIndex(firstIndex: number, cards: Card[]): Card[] {
        let straight = [];
        for (let i = firstIndex; i < cards.length - 1; i++) {

            let card1Value = cards[i].value;
            if (card1Value == 14) {
                card1Value = 1;
            }
            let card2Value = cards[i + 1].value;
            if (i === firstIndex) {
                straight.push(cards[i])
            }
            if (card1Value + 1 === card2Value) {
                straight.push(cards[i + 1]);
            } else if (card1Value === card2Value) {

            } else {
                break;
            }
        }
        return straight;
    }

    export function hasFlush(cards: Card[]): ResultHand {
        let resultHand: ResultHand = null;

        const coloredCards: Card[] = getLongestColoredCards(cards);
        let orderedCards: Card[] = orderCards(cards);
        if (coloredCards.length >= 5) {
            orderedCards = coloredCards.slice(coloredCards.length - 5);
            resultHand = new ResultHand(Rank.FLUSH, orderedCards);
        }


        return resultHand;
    }


    export function hasFullHouse(cards: Card[]): ResultHand {
        let resultHand: ResultHand = null;

        const threeOfAKind:ResultHand = hasThreeOfAKind(cards);
        let pair: ResultHand = null;
        if(threeOfAKind) {
            pair = hasPairWhichNot(cards, threeOfAKind.cards[0]);

        }
        if (threeOfAKind !== null && pair !== null && threeOfAKind.cards[0].value !== pair.cards[0].value) {
            const cards = threeOfAKind.cards.concat(pair.cards);
            resultHand = new ResultHand(Rank.FULL_HOUSE, cards);
        }
        return resultHand;
    }


    export function hasFourOfAKind(cards: Card[]): ResultHand {
        let resultHand: ResultHand = null;

        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                for (let k = j + 1; k < cards.length; k++) {
                    for (let l = k + 1; l < cards.length; l++) {
                        if (cards[i].number === cards[j].number && cards[i].number === cards[k].number && cards[i].number === cards[l].number) {
                            resultHand = new ResultHand(Rank.FOUR_OF_A_KIND, [cards[i], cards[j], cards[k], cards[l]]);
                            break;
                        }
                    }
                }
            }
        }
        return resultHand;
    }


    export function hasThreeOfAKind(cards: Card[]): ResultHand {
        let resultHand: ResultHand = null;

        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                for (let k = j + 1; k < cards.length; k++) {
                    if (cards[i].number === cards[j].number && cards[i].number === cards[k].number) {
                        resultHand = new ResultHand(Rank.THREE_OF_A_KIND, [cards[i], cards[j], cards[k]]);
                        break;
                    }
                }
            }
        }
        return resultHand;
    }


    export function hasTwoPair(cards: Card[]): ResultHand {
        let resultHand: ResultHand = null;
        let pairs: Card[] = [];
        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                if (cards[i].number === cards[j].number && !isAlreadyPair(pairs, cards[i].number)) {
                    pairs.push(cards[i]);
                    pairs.push(cards[j]);
                    break;
                }
            }
        }
        pairs = pairs.sort(function (a, b) {
            return b.value - a.value;
        })
        if (pairs.length === 4) {
            resultHand = new ResultHand(Rank.TWO_PAIR, pairs);
        }
        return resultHand;
    }


    export function isAlreadyPair(pairs: Card[], number: string): boolean {
        return pairs.length > 0 && pairs[0].number === number;
    }


    export function hasPairWhichNot(cards: Card[], card:Card): ResultHand {
        let resultHand: ResultHand = null;

        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                if (cards[i].number === cards[j].number && cards[i].number !== card.number) {
                    resultHand = new ResultHand(Rank.PAIR, [cards[i], cards[j]]);
                    break;
                }
            }
        }
        return resultHand;
    }

    export function hasPair(cards: Card[]): ResultHand {
        let resultHand: ResultHand = null;

        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                if (cards[i].number === cards[j].number) {
                    resultHand = new ResultHand(Rank.PAIR, [cards[i], cards[j]]);
                    break;
                }
            }
        }
        return resultHand;
    }

    export function getHighestCard(cards: Card[]): ResultHand {
        let resultHand: ResultHand = new ResultHand(Rank.HIGH_CARD, [cards[0]]);
        for (let i = 1; i < cards.length; i++) {
            if (cards[i].value > resultHand.cards[0].value) {
                resultHand = new ResultHand(Rank.HIGH_CARD, [cards[i]]);

            }
        }
        return resultHand;
    }


    export function getLongestColoredCards(cards: Card[]): Card[] {
        const orderedCards: Card[] = orderCards(cards);
        let heartCards = getCardByColor(orderedCards, 'Hearts');
        let diamondCards = getCardByColor(orderedCards, 'Diamonds');
        let clubCards = getCardByColor(orderedCards, 'Clubs');
        let spadeCards = getCardByColor(orderedCards, 'Spades');
        if (heartCards.length >= 5) {
            return heartCards;
        } else if (diamondCards.length >= 5) {
            return diamondCards;
        } else if (clubCards.length >= 5) {
            return clubCards;
        } else if (spadeCards.length >= 5) {
            return spadeCards;
        }
        return [];
    }

    export function getCardByColor(cards: Card[], color: string): Card[] {
        let coloredCards: Card[] = [];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].color == color) {
                coloredCards.push(cards[i]);
            }
        }
        return coloredCards;
    }

    export function orderCards(cards: Card[]): Card[] {
        return cards.sort(function (a, b) {
            return a.value - b.value;
        })
    }

    export function orderCardsAceOne(cards: Card[]): Card[] {

        let orderedCards: Card[] = cards.sort(function (a, b) {
            return a.value - b.value;
        });
        let orderedCardAceFirst: Card[] = [];
        if (orderedCards[orderedCards.length - 1].number == 'Ace') {

            orderedCardAceFirst.push(orderedCards[orderedCards.length - 1]);
            for (let i = 0; i < orderedCards.length - 1; i++) {
                orderedCardAceFirst.push(orderedCards[i]);
            }
        } else {
            orderedCardAceFirst = orderedCards;
        }
        return orderedCardAceFirst;
    }
}