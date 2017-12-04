"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultHand_1 = require("../entity/ResultHand");
var Rank_1 = require("../entity/Rank");
var RuleService;
(function (RuleService) {
    function hasRoyalFlush(cards) {
        var coloredCards = getLongestColoredCards(cards);
        var resultHand = null;
        if (coloredCards.length >= 5) {
            var straight = getStraight(coloredCards);
            var straightFlush = getFlushInStraight(straight);
            if (straightFlush.length >= 5 && straightFlush[straightFlush.length - 1].number === 'Ace') {
                resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.ROYAL_FLUSH, straightFlush.slice(straightFlush.length - 5));
            }
        }
        return resultHand;
    }
    RuleService.hasRoyalFlush = hasRoyalFlush;
    function hasStraightFlush(cards) {
        var resultHand = null;
        var coloredCards = getLongestColoredCards(cards);
        if (coloredCards.length >= 5) {
            var straight = getStraight(coloredCards);
            var straightFlush = getFlushInStraight(straight);
            if (straightFlush.length >= 5) {
                resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.STRAIGHT_FLUSH, straightFlush.slice(straightFlush.length - 5));
            }
        }
        return resultHand;
    }
    RuleService.hasStraightFlush = hasStraightFlush;
    function getFlushInStraight(cards) {
        var straight = [];
        straight = getStraightFlushFromIndex(0, cards);
        if (straight.length === 0) {
            straight = getStraightFlushFromIndex(1, cards);
        }
        if (straight.length === 0) {
            straight = getStraightFlushFromIndex(2, cards);
        }
        return straight;
    }
    RuleService.getFlushInStraight = getFlushInStraight;
    function getStraightFlushFromIndex(firstIndex, cards) {
        var straight = [];
        for (var i = firstIndex; i < cards.length - 1; i++) {
            var card1Color = cards[i].color;
            var card2Color = cards[i + 1].color;
            if (card1Color === card2Color) {
                if (i === firstIndex) {
                    straight.push(cards[i]);
                }
                straight.push(cards[i + 1]);
            }
            else {
                break;
            }
        }
        return straight;
    }
    RuleService.getStraightFlushFromIndex = getStraightFlushFromIndex;
    function hasStraight(cards) {
        var resultHand = null;
        var straight = getStraight(cards);
        if (straight.length >= 5) {
            resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.STRAIGHT, straight.slice(straight.length - 5));
        }
        return resultHand;
    }
    RuleService.hasStraight = hasStraight;
    function getStraight(cards) {
        var orderedCards = orderCards(cards);
        var orderedCardsAceOne = orderCardsAceOne(cards);
        var straight = calculateStraight(orderedCards);
        if (straight.length < 5) {
            straight = calculateStraight(orderedCardsAceOne);
        }
        return straight;
    }
    RuleService.getStraight = getStraight;
    function calculateStraight(cards) {
        var straight = [];
        straight = getStraightFromIndex(0, cards);
        if (straight.length < 5) {
            straight = getStraightFromIndex(1, cards);
        }
        if (straight.length < 5) {
            straight = getStraightFromIndex(2, cards);
        }
        return straight;
    }
    RuleService.calculateStraight = calculateStraight;
    function getStraightFromIndex(firstIndex, cards) {
        var straight = [];
        for (var i = firstIndex; i < cards.length - 1; i++) {
            var card1Value = cards[i].value;
            if (card1Value == 14) {
                card1Value = 1;
            }
            var card2Value = cards[i + 1].value;
            if (i === firstIndex) {
                straight.push(cards[i]);
            }
            if (card1Value + 1 === card2Value) {
                straight.push(cards[i + 1]);
            }
            else if (card1Value === card2Value) {
            }
            else {
                break;
            }
        }
        return straight;
    }
    RuleService.getStraightFromIndex = getStraightFromIndex;
    function hasFlush(cards) {
        var resultHand = null;
        var coloredCards = getLongestColoredCards(cards);
        var orderedCards = orderCards(cards);
        if (coloredCards.length >= 5) {
            orderedCards = coloredCards.slice(coloredCards.length - 5);
            resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.FLUSH, orderedCards);
        }
        return resultHand;
    }
    RuleService.hasFlush = hasFlush;
    function hasFullHouse(cards) {
        var resultHand = null;
        var threeOfAKind = hasThreeOfAKind(cards);
        var pair = null;
        if (threeOfAKind) {
            pair = hasPairWhichNot(cards, threeOfAKind.cards[0]);
        }
        if (threeOfAKind !== null && pair !== null && threeOfAKind.cards[0].value !== pair.cards[0].value) {
            var cards_1 = threeOfAKind.cards.concat(pair.cards);
            resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.FULL_HOUSE, cards_1);
        }
        return resultHand;
    }
    RuleService.hasFullHouse = hasFullHouse;
    function hasFourOfAKind(cards) {
        var resultHand = null;
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                for (var k = j + 1; k < cards.length; k++) {
                    for (var l = k + 1; l < cards.length; l++) {
                        if (cards[i].number === cards[j].number && cards[i].number === cards[k].number && cards[i].number === cards[l].number) {
                            resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.FOUR_OF_A_KIND, [cards[i], cards[j], cards[k], cards[l]]);
                            break;
                        }
                    }
                }
            }
        }
        return resultHand;
    }
    RuleService.hasFourOfAKind = hasFourOfAKind;
    function hasThreeOfAKind(cards) {
        var resultHand = null;
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                for (var k = j + 1; k < cards.length; k++) {
                    if (cards[i].number === cards[j].number && cards[i].number === cards[k].number) {
                        resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.THREE_OF_A_KIND, [cards[i], cards[j], cards[k]]);
                        break;
                    }
                }
            }
        }
        return resultHand;
    }
    RuleService.hasThreeOfAKind = hasThreeOfAKind;
    function hasTwoPair(cards) {
        var resultHand = null;
        var pairs = [];
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                if (cards[i].number === cards[j].number && !isAlreadyPair(pairs, cards[i].number)) {
                    pairs.push(cards[i]);
                    pairs.push(cards[j]);
                    break;
                }
            }
        }
        pairs = pairs.sort(function (a, b) {
            return b.value - a.value;
        });
        if (pairs.length === 4) {
            resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.TWO_PAIR, pairs);
        }
        return resultHand;
    }
    RuleService.hasTwoPair = hasTwoPair;
    function isAlreadyPair(pairs, number) {
        return pairs.length > 0 && pairs[0].number === number;
    }
    RuleService.isAlreadyPair = isAlreadyPair;
    function hasPairWhichNot(cards, card) {
        var resultHand = null;
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                if (cards[i].number === cards[j].number && cards[i].number !== card.number) {
                    resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.PAIR, [cards[i], cards[j]]);
                    break;
                }
            }
        }
        return resultHand;
    }
    RuleService.hasPairWhichNot = hasPairWhichNot;
    function hasPair(cards) {
        var resultHand = null;
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                if (cards[i].number === cards[j].number) {
                    resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.PAIR, [cards[i], cards[j]]);
                    break;
                }
            }
        }
        return resultHand;
    }
    RuleService.hasPair = hasPair;
    function getHighestCard(cards) {
        var resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.HIGH_CARD, [cards[0]]);
        for (var i = 1; i < cards.length; i++) {
            if (cards[i].value > resultHand.cards[0].value) {
                resultHand = new ResultHand_1.ResultHand(Rank_1.Rank.HIGH_CARD, [cards[i]]);
            }
        }
        return resultHand;
    }
    RuleService.getHighestCard = getHighestCard;
    function getLongestColoredCards(cards) {
        var orderedCards = orderCards(cards);
        var heartCards = getCardByColor(orderedCards, 'Hearts');
        var diamondCards = getCardByColor(orderedCards, 'Diamonds');
        var clubCards = getCardByColor(orderedCards, 'Clubs');
        var spadeCards = getCardByColor(orderedCards, 'Spades');
        if (heartCards.length >= 5) {
            return heartCards;
        }
        else if (diamondCards.length >= 5) {
            return diamondCards;
        }
        else if (clubCards.length >= 5) {
            return clubCards;
        }
        else if (spadeCards.length >= 5) {
            return spadeCards;
        }
        return [];
    }
    RuleService.getLongestColoredCards = getLongestColoredCards;
    function getCardByColor(cards, color) {
        var coloredCards = [];
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].color == color) {
                coloredCards.push(cards[i]);
            }
        }
        return coloredCards;
    }
    RuleService.getCardByColor = getCardByColor;
    function orderCards(cards) {
        return cards.sort(function (a, b) {
            return a.value - b.value;
        });
    }
    RuleService.orderCards = orderCards;
    function orderCardsAceOne(cards) {
        var orderedCards = cards.sort(function (a, b) {
            return a.value - b.value;
        });
        var orderedCardAceFirst = [];
        if (orderedCards[orderedCards.length - 1].number == 'Ace') {
            orderedCardAceFirst.push(orderedCards[orderedCards.length - 1]);
            for (var i = 0; i < orderedCards.length - 1; i++) {
                orderedCardAceFirst.push(orderedCards[i]);
            }
        }
        else {
            orderedCardAceFirst = orderedCards;
        }
        return orderedCardAceFirst;
    }
    RuleService.orderCardsAceOne = orderCardsAceOne;
})(RuleService = exports.RuleService || (exports.RuleService = {}));
