import { EvaluateHandService } from '../src/service/EvaluateHandService';
import { expect } from 'chai';
import 'mocha';
import {Card} from "../src/entity/Card";
import {ResultHand} from "../src/entity/ResultHand";
import {Rank} from "../src/entity/Rank";
import {RuleService} from "../src/service/RuleService";
import hasPair = RuleService.hasPair;
import getHighestCard = RuleService.getHighestCard;
import hasTwoPair = RuleService.hasTwoPair;
import hasThreeOfAKind = RuleService.hasThreeOfAKind;
import hasFourOfAKind = RuleService.hasFourOfAKind;
import hasFullHouse = RuleService.hasFullHouse;
import hasFlush = RuleService.hasFlush;
import hasStraight = RuleService.hasStraight;
import hasStraightFlush = RuleService.hasStraightFlush;
import hasRoyalFlush = RuleService.hasRoyalFlush;


describe('Check rules', () => {

    it('hasPair should return true', () => {
        const cards:Card[] = [
            new Card('2','Hearts'),
            new Card('3','Hearts'),
            new Card('4','Hearts'),
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('7','Hearts'),
            new Card('2','Diamonds')

        ];
        const result: ResultHand = hasPair(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.PAIR);
    });

    it('hasPair should return false', () => {
        const cards:Card[] = [
            new Card('2','Hearts'),
            new Card('3','Hearts'),
            new Card('4','Hearts'),
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasPair(cards);
        console.log(result);
        expect(result).to.equal(null);
    });

    it('highestCard with Ace should return highestCard', () => {
        const cards:Card[] = [
            new Card('Ace','Hearts'),
            new Card('3','Hearts'),
            new Card('4','Hearts'),
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = getHighestCard(cards);
        expect(result.cards[0].number).to.equal('Ace');
    });

    it('highestCard should return highestCard', () => {
        const cards:Card[] = [
            new Card('2','Hearts'),
            new Card('3','Hearts'),
            new Card('Jack','Hearts'),
            new Card('Queen','Hearts'),
            new Card('King','Hearts'),
            new Card('Ace','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = getHighestCard(cards);
        expect(result.cards[0].number).to.equal('Ace');
    });

    it('highestCard with numbers should return highestCard', () => {
        const cards:Card[] = [
            new Card('2','Hearts'),
            new Card('3','Hearts'),
            new Card('6','Hearts'),
            new Card('10','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = getHighestCard(cards);
        expect(result.cards[0].number).to.equal('10');
    });


    it('two pair should return two pair', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('2','Hearts'),
            new Card('3','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasTwoPair(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.TWO_PAIR);
    });

    it('two pair should return null', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('2','Hearts'),
            new Card('5','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasTwoPair(cards);
        console.log(result);
        expect(result).to.equal(null);
    });


    it('three of a kind should return three of a kind', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('2','Clubs'),
            new Card('2','Hearts'),
            new Card('5','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasThreeOfAKind(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.THREE_OF_A_KIND);
    });


    it('three of a kind should return null', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('2','Hearts'),
            new Card('5','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasThreeOfAKind(cards);
        console.log(result);
        expect(result).to.equal(null);
    });


    it('four of a kind should return four of a kind', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('2','Clubs'),
            new Card('2','Hearts'),
            new Card('2','Spades'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasFourOfAKind(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.FOUR_OF_A_KIND);
    });


    it('four of a kind should return null', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('2','Hearts'),
            new Card('5','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasFourOfAKind(cards);
        console.log(result);
        expect(result).to.equal(null);
    });

    it('full house should return full house', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('2','Clubs'),
            new Card('2','Hearts'),
            new Card('4','Spades'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasFullHouse(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.FULL_HOUSE);
    });


    it('full house should return null', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('2','Hearts'),
            new Card('5','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasFullHouse(cards);
        console.log(result);
        expect(result).to.equal(null);
    });

    it('flush should return flush', () => {
        const cards:Card[] = [
            new Card('Ace','Hearts'),
            new Card('9','Hearts'),
            new Card('2','Hearts'),
            new Card('5','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasFlush(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.FLUSH);
    });


    it('flush should return null', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('2','Diamonds'),
            new Card('5','Hearts'),
            new Card('4','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];
        const result: ResultHand = hasFlush(cards);
        console.log(result);
        expect(result).to.equal(null);
    });

    it('straight  should return straight last ', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('8','Hearts'),
            new Card('9','Hearts')

        ];


        const result: ResultHand = hasStraight(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.STRAIGHT);
    });


    it('straight with high should return straight last ', () => {
        const cards:Card[] = [
            new Card('10','Diamonds'),
            new Card('3','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('7','Hearts'),
            new Card('9','Hearts')

        ];


        const result: ResultHand = hasStraight(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.STRAIGHT);
    });



    it('straight with high no ace should return straight last ', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('2','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts')

        ];


        const result: ResultHand = hasStraight(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.STRAIGHT);
    });

    it('straight with high should return straight', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Hearts'),
            new Card('7','Hearts'),
            new Card('8','Hearts'),
            new Card('Ace','Hearts')

        ];



        const result: ResultHand = hasStraight(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.STRAIGHT);
    });

    it('straight with middle should return straight', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Hearts'),
            new Card('7','Hearts'),
            new Card('Ace','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand = hasStraight(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.STRAIGHT);
    });

    it('straight with Ace should return straight', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Hearts'),
            new Card('Ace','Hearts'),
            new Card('Ace','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand = hasStraight(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.STRAIGHT);
    });


    it('straight should return null', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('4','Diamonds'),
            new Card('6','Diamonds'),
            new Card('7','Hearts'),
            new Card('10','Hearts'),
            new Card('Ace','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand = hasStraight(cards);
        console.log(result);
        expect(result).to.equal(null);
    });

    it('straight flush should return straight flush', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Diamonds'),
            new Card('6','Diamonds'),
            new Card('Ace','Diamonds'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand = hasStraightFlush(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.STRAIGHT_FLUSH);
    });


    it('straight flush with ace should return straight flush with ace', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Diamonds'),
            new Card('7','Diamonds'),
            new Card('Ace','Diamonds'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand = hasStraightFlush(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.STRAIGHT_FLUSH);
    });


    it('straight but flush broken in the middle should retur null', () => {
        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('3','Diamonds'),
            new Card('4','Diamonds'),
            new Card('5','Hearts'),
            new Card('6','Diamonds'),
            new Card('Ace','Diamonds'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand = hasStraightFlush(cards);
        console.log(result);
        expect(result).to.equal(null);
    });

    it('royal flush should return royal flush', () => {
        const cards:Card[] = [
            new Card('2','Hearts'),
            new Card('10','Diamonds'),
            new Card('4','Hearts'),
            new Card('Queen','Diamonds'),
            new Card('Jack','Diamonds'),
            new Card('King','Diamonds'),
            new Card('Ace','Diamonds')

        ];

        const result: ResultHand = hasRoyalFlush(cards);
        console.log(result);
        expect(result.rank).to.equal(Rank.ROYAL_FLUSH);
    });

    it('royal flush when not all color same should return null', () => {
        const cards:Card[] = [
            new Card('2','Hearts'),
            new Card('10','Diamonds'),
            new Card('4','Hearts'),
            new Card('Queen','Diamonds'),
            new Card('Jack','Hearts'),
            new Card('King','Diamonds'),
            new Card('Ace','Diamonds')

        ];

        const result: ResultHand = hasRoyalFlush(cards);
        console.log(result);
        expect(result).to.equal(null);
    });

    it('royal flush when Ace different color should return null', () => {
        const cards:Card[] = [
            new Card('2','Hearts'),
            new Card('10','Diamonds'),
            new Card('9','Diamonds'),
            new Card('Queen','Diamonds'),
            new Card('Jack','Diamonds'),
            new Card('King','Diamonds'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand = hasRoyalFlush(cards);
        console.log(result);
        expect(result).to.equal(null);
    });





});