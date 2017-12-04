import {Card} from "../entity/Card";
import {getRankInNumber, Rank} from "../entity/Rank";
import {ResultHand} from "../entity/ResultHand";
import {Hand} from "../entity/Hand";
import {RuleService} from "./RuleService";
import hasRoyalFlush = RuleService.hasRoyalFlush;
import hasStraightFlush = RuleService.hasStraightFlush;
import hasFourOfAKind = RuleService.hasFourOfAKind;
import hasFullHouse = RuleService.hasFullHouse;
import hasFlush = RuleService.hasFlush;
import hasStraight = RuleService.hasStraight;
import hasThreeOfAKind = RuleService.hasThreeOfAKind;
import hasTwoPair = RuleService.hasTwoPair;
import hasPair = RuleService.hasPair;
import getHighestCard = RuleService.getHighestCard;

export module EvaluateHandService {




    export function evaluateWinner(hands: Hand[], tableCards: Card[]): ResultHand[] {
        let resultHands: ResultHand[] = evaluateHands(hands, tableCards);
        resultHands = resultHands.sort(function (a,b) {
            return getRankInNumber(b.rank) - getRankInNumber(a.rank);
        });

        resultHands = getEven(resultHands);
        if (resultHands.length > 1) {
            resultHands = calculateEvenWinner(resultHands);
        }
        return resultHands;
    }


    export function calculateEvenWinner(evenHands: ResultHand[]): ResultHand[] {
        let afterEvenHands: ResultHand[] = [];
        if(evenHands[0].rank === Rank.HIGH_CARD) {
            afterEvenHands = evaluateHighCards(evenHands, 0);
        }
        if(evenHands[0].rank === Rank.PAIR) {
            afterEvenHands = calculateEvenPair(evenHands);
        }
        if(evenHands[0].rank === Rank.TWO_PAIR) {
            afterEvenHands = calculateEvenTwoPair(evenHands);
        }
        if(evenHands[0].rank === Rank.THREE_OF_A_KIND) {
            afterEvenHands = calculateEvenThreeOfAKind(evenHands);
        }
        if(evenHands[0].rank === Rank.STRAIGHT) {
            afterEvenHands = evaluateHighCards(evenHands,0);
        }
        if(evenHands[0].rank === Rank.FLUSH) {
            afterEvenHands = evaluateHighCards(evenHands,0);
        }
        if(evenHands[0].rank === Rank.FULL_HOUSE) {
            afterEvenHands = evaluateHighCards(evenHands,0);
        }
        if(evenHands[0].rank === Rank.FOUR_OF_A_KIND) {
            afterEvenHands = evaluateHighCards(evenHands,0);
        }
        if(evenHands[0].rank === Rank.STRAIGHT_FLUSH) {
            afterEvenHands = evaluateHighCards(evenHands,0);
        }
        if(evenHands[0].rank === Rank.ROYAL_FLUSH) {
            afterEvenHands = evaluateHighCards(evenHands,0);
        }

        return afterEvenHands;
    }



    export function calculateEvenThreeOfAKind(evenHands :ResultHand[]): ResultHand[] {
        let sortThreeOfAKind:ResultHand[] = evenHands.sort(function (a,b) {
            if(b.cards[0].value !== a.cards[0].value) {
                return b.cards[0].value - a.cards[0].value;
            }
        });

        let evenPairs:ResultHand[] = [sortThreeOfAKind[0]];

        for(let i = 0; i < sortThreeOfAKind.length - 1; i++) {
            if (sortThreeOfAKind[i].cards[0].value == sortThreeOfAKind[i + 1].cards[0].value) {
                evenPairs.push(sortThreeOfAKind[i + 1])
            }
        }
        if (evenPairs.length > 1) {
            evenPairs = evaluateHighCards(evenPairs,3);
        }

        return evenPairs;

    }

    export function calculateEvenTwoPair(evenHands :ResultHand[]): ResultHand[] {
        let sortPairs:ResultHand[] = evenHands.sort(function (a,b) {
            if(b.cards[0].value !== a.cards[0].value) {
                return b.cards[0].value - a.cards[0].value;

            } else {
                return b.cards[2].value - a.cards[2].value;
            }
        });

        let evenPairs:ResultHand[] = [sortPairs[0]];

        for(let i = 0; i < sortPairs.length - 1; i++) {
            if (sortPairs[i].cards[0].value == sortPairs[i + 1].cards[0].value) {
                evenPairs.push(sortPairs[i + 1])
            }
        }
        if (evenPairs.length > 1) {
            evenPairs = evaluateHighCards(evenPairs,4);
        }

        return evenPairs;

    }

    export function calculateEvenPair(evenHands :ResultHand[]): ResultHand[] {
        let sortPairs:ResultHand[] = evenHands.sort(function (a,b) {
            return b.cards[0].value - a.cards[0].value;
        });

        let evenPairs:ResultHand[] = [sortPairs[0]];

        for(let i = 0; i < sortPairs.length - 1; i++) {
            if (sortPairs[i].cards[0].value == sortPairs[i + 1].cards[0].value) {
                evenPairs.push(sortPairs[i + 1])
            }
        }
        if (evenPairs.length > 1) {
            evenPairs = evaluateHighCards(evenPairs,2);
        }

        return evenPairs;

    }

    export function evaluateHighCards(resultHands: ResultHand[], fromIndex): ResultHand[] {

        let highCards: ResultHand[] = resultHands;


        for (let i = fromIndex; i < 5; i++) {
            for (let j = 0; j < resultHands.length -1; j++) {
                const card1Value = resultHands[0].cards[i].value;
                const card2Value = resultHands[j + 1].cards[i].value;
                if(card1Value > card2Value) {
                    highCards = removeFromHighCards(highCards, resultHands[j + 1]);
                }
            }
        }
        return highCards;

    }

    export function removeFromHighCards(higCards: ResultHand[], resultHand:ResultHand) {
        for(let i = 0; i < higCards.length; i ++) {
            if(higCards[i].user.id === resultHand.user.id) {
                higCards.splice(i,1);
                return higCards;
            }
        }
    }

    export function sortCards(cards1: Card[], cards2: Card[]) {

        for(let i = 0; i < cards1.length; i++) {
            if(cards1[i].value < cards2[i].value) {
                return 1;

            } else if (cards1[i].value > cards2[i].value) {
                return -1;
            }
        }
        return 0;
    }


    export function getEven(resultHands: ResultHand[]): ResultHand[] {
        let evenHands:ResultHand[] = [resultHands[0]];

        for(let i = 0; i < resultHands.length - 1; i++) {
            if(resultHands[0].rank === resultHands[i + 1].rank) {
                evenHands.push(resultHands[i+1]);
            }
        }

        return evenHands;
    }

    export function evaluateHands(hands: Hand[], tableCards: Card[]): ResultHand[] {
        let resultHands: ResultHand[] = [];
        for(let i = 0; i < hands.length; i++) {
            const fullHand:Card[] = tableCards.concat(hands[i].cards);
            let resultHand: ResultHand = evaluateUserHand(fullHand);
            resultHand.user = hands[i].user;
            resultHand = fillWithHighCards(resultHand, fullHand);
            resultHands.push(resultHand);
        }
        resultHands = resultHands.sort(function (a,b) {
            return sortCards(a.cards,b.cards);
        })
        return resultHands;
    }

    export function fillWithHighCards(resultHand: ResultHand, cards: Card[]): ResultHand {
        cards = cards.sort(function (a,b) {
            return b.value - a.value;
        });
        let i = 0;
        while(resultHand.cards.length < 5 && i < cards.length) {
            const card: Card = cards[i];
            if(!isInMyCards(resultHand.cards, card)) {
                resultHand.cards.push(card);
            }
            i++;
        }


        return resultHand;
    }



    export function isInMyCards(cards: Card[], card: Card): boolean {
        let isIn = false;
        for(let i = 0; i < cards.length; i++) {
            if(cards[i].number === card.number && cards[i].color === card.color) {
                isIn = true;
                break;
            }
        }
        return isIn;
    }

    export function evaluateUserHand(cards: Card[]): ResultHand {
        let resultHand: ResultHand = null;
        resultHand = hasRoyalFlush(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = hasStraightFlush(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = hasFourOfAKind(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = hasFullHouse(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = hasFlush(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = hasStraight(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = hasThreeOfAKind(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = hasTwoPair(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = hasPair(cards);
        if (resultHand) {
            return resultHand;
        }

        resultHand = getHighestCard(cards);
        if (resultHand) {
            return resultHand;
        }

        return resultHand;
    }



}


