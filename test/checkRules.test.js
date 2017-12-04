"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var Card_1 = require("../src/entity/Card");
var Rank_1 = require("../src/entity/Rank");
var RuleService_1 = require("../src/service/RuleService");
var hasPair = RuleService_1.RuleService.hasPair;
var getHighestCard = RuleService_1.RuleService.getHighestCard;
var hasTwoPair = RuleService_1.RuleService.hasTwoPair;
var hasThreeOfAKind = RuleService_1.RuleService.hasThreeOfAKind;
var hasFourOfAKind = RuleService_1.RuleService.hasFourOfAKind;
var hasFullHouse = RuleService_1.RuleService.hasFullHouse;
var hasFlush = RuleService_1.RuleService.hasFlush;
var hasStraight = RuleService_1.RuleService.hasStraight;
var hasStraightFlush = RuleService_1.RuleService.hasStraightFlush;
var hasRoyalFlush = RuleService_1.RuleService.hasRoyalFlush;
describe('Check rules', function () {
    it('hasPair should return true', function () {
        var cards = [
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('2', 'Diamonds')
        ];
        var result = hasPair(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.PAIR);
    });
    it('hasPair should return false', function () {
        var cards = [
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasPair(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('highestCard with Ace should return highestCard', function () {
        var cards = [
            new Card_1.Card('Ace', 'Hearts'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = getHighestCard(cards);
        chai_1.expect(result.cards[0].number).to.equal('Ace');
    });
    it('highestCard should return highestCard', function () {
        var cards = [
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('Jack', 'Hearts'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('King', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = getHighestCard(cards);
        chai_1.expect(result.cards[0].number).to.equal('Ace');
    });
    it('highestCard with numbers should return highestCard', function () {
        var cards = [
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('10', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = getHighestCard(cards);
        chai_1.expect(result.cards[0].number).to.equal('10');
    });
    it('two pair should return two pair', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasTwoPair(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.TWO_PAIR);
    });
    it('two pair should return null', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasTwoPair(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('three of a kind should return three of a kind', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('2', 'Clubs'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasThreeOfAKind(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.THREE_OF_A_KIND);
    });
    it('three of a kind should return null', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasThreeOfAKind(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('four of a kind should return four of a kind', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('2', 'Clubs'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('2', 'Spades'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasFourOfAKind(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.FOUR_OF_A_KIND);
    });
    it('four of a kind should return null', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasFourOfAKind(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('full house should return full house', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('2', 'Clubs'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('4', 'Spades'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasFullHouse(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.FULL_HOUSE);
    });
    it('full house should return null', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasFullHouse(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('flush should return flush', function () {
        var cards = [
            new Card_1.Card('Ace', 'Hearts'),
            new Card_1.Card('9', 'Hearts'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasFlush(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.FLUSH);
    });
    it('flush should return null', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasFlush(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('straight  should return straight last ', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('8', 'Hearts'),
            new Card_1.Card('9', 'Hearts')
        ];
        var result = hasStraight(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.STRAIGHT);
    });
    it('straight with high should return straight last ', function () {
        var cards = [
            new Card_1.Card('10', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('9', 'Hearts')
        ];
        var result = hasStraight(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.STRAIGHT);
    });
    it('straight with high no ace should return straight last ', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts')
        ];
        var result = hasStraight(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.STRAIGHT);
    });
    it('straight with high should return straight', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('8', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = hasStraight(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.STRAIGHT);
    });
    it('straight with middle should return straight', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = hasStraight(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.STRAIGHT);
    });
    it('straight with Ace should return straight', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = hasStraight(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.STRAIGHT);
    });
    it('straight should return null', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('10', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = hasStraight(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('straight flush should return straight flush', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Diamonds'),
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('Ace', 'Diamonds'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = hasStraightFlush(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.STRAIGHT_FLUSH);
    });
    it('straight flush with ace should return straight flush with ace', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Diamonds'),
            new Card_1.Card('7', 'Diamonds'),
            new Card_1.Card('Ace', 'Diamonds'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = hasStraightFlush(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.STRAIGHT_FLUSH);
    });
    it('straight but flush broken in the middle should retur null', function () {
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('3', 'Diamonds'),
            new Card_1.Card('4', 'Diamonds'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('Ace', 'Diamonds'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = hasStraightFlush(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('royal flush should return royal flush', function () {
        var cards = [
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('10', 'Diamonds'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('Queen', 'Diamonds'),
            new Card_1.Card('Jack', 'Diamonds'),
            new Card_1.Card('King', 'Diamonds'),
            new Card_1.Card('Ace', 'Diamonds')
        ];
        var result = hasRoyalFlush(cards);
        console.log(result);
        chai_1.expect(result.rank).to.equal(Rank_1.Rank.ROYAL_FLUSH);
    });
    it('royal flush when not all color same should return null', function () {
        var cards = [
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('10', 'Diamonds'),
            new Card_1.Card('4', 'Hearts'),
            new Card_1.Card('Queen', 'Diamonds'),
            new Card_1.Card('Jack', 'Hearts'),
            new Card_1.Card('King', 'Diamonds'),
            new Card_1.Card('Ace', 'Diamonds')
        ];
        var result = hasRoyalFlush(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
    it('royal flush when Ace different color should return null', function () {
        var cards = [
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('10', 'Diamonds'),
            new Card_1.Card('9', 'Diamonds'),
            new Card_1.Card('Queen', 'Diamonds'),
            new Card_1.Card('Jack', 'Diamonds'),
            new Card_1.Card('King', 'Diamonds'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = hasRoyalFlush(cards);
        console.log(result);
        chai_1.expect(result).to.equal(null);
    });
});
