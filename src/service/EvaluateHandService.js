"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rank_1 = require("../entity/Rank");
var RuleService_1 = require("./RuleService");
var hasRoyalFlush = RuleService_1.RuleService.hasRoyalFlush;
var hasStraightFlush = RuleService_1.RuleService.hasStraightFlush;
var hasFourOfAKind = RuleService_1.RuleService.hasFourOfAKind;
var hasFullHouse = RuleService_1.RuleService.hasFullHouse;
var hasFlush = RuleService_1.RuleService.hasFlush;
var hasStraight = RuleService_1.RuleService.hasStraight;
var hasThreeOfAKind = RuleService_1.RuleService.hasThreeOfAKind;
var hasTwoPair = RuleService_1.RuleService.hasTwoPair;
var hasPair = RuleService_1.RuleService.hasPair;
var getHighestCard = RuleService_1.RuleService.getHighestCard;
var EvaluateHandService;
(function (EvaluateHandService) {
    function evaluateWinner(hands, tableCards) {
        var resultHands = evaluateHands(hands, tableCards);
        resultHands = resultHands.sort(function (a, b) {
            return Rank_1.getRankInNumber(b.rank) - Rank_1.getRankInNumber(a.rank);
        });
        resultHands = getEven(resultHands);
        if (resultHands.length > 1) {
            resultHands = calculateEvenWinner(resultHands);
        }
        return resultHands;
    }
    EvaluateHandService.evaluateWinner = evaluateWinner;
    function calculateEvenWinner(evenHands) {
        var afterEvenHands = [];
        if (evenHands[0].rank === Rank_1.Rank.HIGH_CARD) {
            afterEvenHands = evaluateHighCards(evenHands, 0);
        }
        if (evenHands[0].rank === Rank_1.Rank.PAIR) {
            afterEvenHands = calculateEvenPair(evenHands);
        }
        if (evenHands[0].rank === Rank_1.Rank.TWO_PAIR) {
            afterEvenHands = calculateEvenTwoPair(evenHands);
        }
        if (evenHands[0].rank === Rank_1.Rank.THREE_OF_A_KIND) {
            afterEvenHands = calculateEvenThreeOfAKind(evenHands);
        }
        if (evenHands[0].rank === Rank_1.Rank.STRAIGHT) {
            afterEvenHands = evaluateHighCards(evenHands, 0);
        }
        if (evenHands[0].rank === Rank_1.Rank.FLUSH) {
            afterEvenHands = evaluateHighCards(evenHands, 0);
        }
        if (evenHands[0].rank === Rank_1.Rank.FULL_HOUSE) {
            afterEvenHands = evaluateHighCards(evenHands, 0);
        }
        if (evenHands[0].rank === Rank_1.Rank.FOUR_OF_A_KIND) {
            afterEvenHands = evaluateHighCards(evenHands, 0);
        }
        if (evenHands[0].rank === Rank_1.Rank.STRAIGHT_FLUSH) {
            afterEvenHands = evaluateHighCards(evenHands, 0);
        }
        if (evenHands[0].rank === Rank_1.Rank.ROYAL_FLUSH) {
            afterEvenHands = evaluateHighCards(evenHands, 0);
        }
        return afterEvenHands;
    }
    EvaluateHandService.calculateEvenWinner = calculateEvenWinner;
    function calculateEvenThreeOfAKind(evenHands) {
        var sortThreeOfAKind = evenHands.sort(function (a, b) {
            if (b.cards[0].value !== a.cards[0].value) {
                return b.cards[0].value - a.cards[0].value;
            }
        });
        var evenPairs = [sortThreeOfAKind[0]];
        for (var i = 0; i < sortThreeOfAKind.length - 1; i++) {
            if (sortThreeOfAKind[i].cards[0].value == sortThreeOfAKind[i + 1].cards[0].value) {
                evenPairs.push(sortThreeOfAKind[i + 1]);
            }
        }
        if (evenPairs.length > 1) {
            evenPairs = evaluateHighCards(evenPairs, 3);
        }
        return evenPairs;
    }
    EvaluateHandService.calculateEvenThreeOfAKind = calculateEvenThreeOfAKind;
    function calculateEvenTwoPair(evenHands) {
        var sortPairs = evenHands.sort(function (a, b) {
            if (b.cards[0].value !== a.cards[0].value) {
                return b.cards[0].value - a.cards[0].value;
            }
            else {
                return b.cards[2].value - a.cards[2].value;
            }
        });
        var evenPairs = [sortPairs[0]];
        for (var i = 0; i < sortPairs.length - 1; i++) {
            if (sortPairs[i].cards[0].value == sortPairs[i + 1].cards[0].value) {
                evenPairs.push(sortPairs[i + 1]);
            }
        }
        if (evenPairs.length > 1) {
            evenPairs = evaluateHighCards(evenPairs, 4);
        }
        return evenPairs;
    }
    EvaluateHandService.calculateEvenTwoPair = calculateEvenTwoPair;
    function calculateEvenPair(evenHands) {
        var sortPairs = evenHands.sort(function (a, b) {
            return b.cards[0].value - a.cards[0].value;
        });
        var evenPairs = [sortPairs[0]];
        for (var i = 0; i < sortPairs.length - 1; i++) {
            if (sortPairs[i].cards[0].value == sortPairs[i + 1].cards[0].value) {
                evenPairs.push(sortPairs[i + 1]);
            }
        }
        if (evenPairs.length > 1) {
            evenPairs = evaluateHighCards(evenPairs, 2);
        }
        return evenPairs;
    }
    EvaluateHandService.calculateEvenPair = calculateEvenPair;
    function evaluateHighCards(resultHands, fromIndex) {
        var highCards = resultHands;
        for (var i = fromIndex; i < 5; i++) {
            for (var j = 0; j < resultHands.length - 1; j++) {
                var card1Value = resultHands[0].cards[i].value;
                var card2Value = resultHands[j + 1].cards[i].value;
                if (card1Value > card2Value) {
                    highCards = removeFromHighCards(highCards, resultHands[j + 1]);
                }
            }
        }
        return highCards;
    }
    EvaluateHandService.evaluateHighCards = evaluateHighCards;
    function removeFromHighCards(higCards, resultHand) {
        for (var i = 0; i < higCards.length; i++) {
            if (higCards[i].user.id === resultHand.user.id) {
                higCards.splice(i, 1);
                return higCards;
            }
        }
    }
    EvaluateHandService.removeFromHighCards = removeFromHighCards;
    function sortCards(cards1, cards2) {
        for (var i = 0; i < cards1.length; i++) {
            if (cards1[i].value < cards2[i].value) {
                return 1;
            }
            else if (cards1[i].value > cards2[i].value) {
                return -1;
            }
        }
        return 0;
    }
    EvaluateHandService.sortCards = sortCards;
    function getEven(resultHands) {
        var evenHands = [resultHands[0]];
        for (var i = 0; i < resultHands.length - 1; i++) {
            if (resultHands[0].rank === resultHands[i + 1].rank) {
                evenHands.push(resultHands[i + 1]);
            }
        }
        return evenHands;
    }
    EvaluateHandService.getEven = getEven;
    function evaluateHands(hands, tableCards) {
        var resultHands = [];
        for (var i = 0; i < hands.length; i++) {
            var fullHand = tableCards.concat(hands[i].cards);
            var resultHand = evaluateUserHand(fullHand);
            resultHand.user = hands[i].user;
            resultHand = fillWithHighCards(resultHand, fullHand);
            resultHands.push(resultHand);
        }
        resultHands = resultHands.sort(function (a, b) {
            return sortCards(a.cards, b.cards);
        });
        return resultHands;
    }
    EvaluateHandService.evaluateHands = evaluateHands;
    function fillWithHighCards(resultHand, cards) {
        cards = cards.sort(function (a, b) {
            return b.value - a.value;
        });
        var i = 0;
        while (resultHand.cards.length < 5 && i < cards.length) {
            var card = cards[i];
            if (!isInMyCards(resultHand.cards, card)) {
                resultHand.cards.push(card);
            }
            i++;
        }
        return resultHand;
    }
    EvaluateHandService.fillWithHighCards = fillWithHighCards;
    function isInMyCards(cards, card) {
        var isIn = false;
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].number === card.number && cards[i].color === card.color) {
                isIn = true;
                break;
            }
        }
        return isIn;
    }
    EvaluateHandService.isInMyCards = isInMyCards;
    function evaluateUserHand(cards) {
        var resultHand = null;
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
    EvaluateHandService.evaluateUserHand = evaluateUserHand;
})(EvaluateHandService = exports.EvaluateHandService || (exports.EvaluateHandService = {}));
