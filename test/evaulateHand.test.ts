import { EvaluateHandService } from '../src/service/EvaluateHandService';
import { expect } from 'chai';
import 'mocha';
import {Card} from "../src/entity/Card";
import {ResultHand} from "../src/entity/ResultHand";
import {User} from "../src/entity/User";
import {Hand} from '../src/entity/Hand';
import evaluateWinner = EvaluateHandService.evaluateWinner;

describe('Evaluate Hand ', () => {


    it('one pair even', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Hearts'),new Card('4','Diamonds')]);
        let hand2: Hand = new Hand(user2, [new Card('2','Spades'),new Card('4','Hearts')]);



        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('Queen','Hearts'),
            new Card('Jack','Spades'),
            new Card('3','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result.length).to.equal(2);
    });




    it('one pair both high hand', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Hearts'),new Card('4','Diamonds')]);
        let hand2: Hand = new Hand(user2, [new Card('2','Spades'),new Card('King','Diamonds')]);
        let hand3: Hand = new Hand(user3, [new Card('2','Clubs'),new Card('10','Diamonds')]);


        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('Queen','Hearts'),
            new Card('Jack','Spades'),
            new Card('3','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1, hand3, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result[0].user.id).to.equal(user2.id);
    });

    it('one pair ', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Hearts'),new Card('4','Diamonds')]);
        let hand2: Hand = new Hand(user2, [new Card('6','Spades'),new Card('7','Diamonds')]);


        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('Queen','Hearts'),
            new Card('Jack','Spades'),
            new Card('3','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result[0].user.id).to.equal(user1.id);
    });

    it('one pair won highest pair', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Hearts'),new Card('4','Diamonds')]);
        let hand2: Hand = new Hand(user2, [new Card('3','Spades'),new Card('7','Diamonds')]);


        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('Queen','Hearts'),
            new Card('Jack','Spades'),
            new Card('3','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result[0].user.id).to.equal(user2.id);
    });


    it('highest card even', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('8','Hearts'),new Card('7','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('8','Spades'),new Card('7','Diamonds')]);


        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('Queen','Hearts'),
            new Card('Jack','Spades'),
            new Card('3','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result.length).to.equal(2);
    });

    it('highest card won highest', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('9','Hearts'),new Card('7','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('8','Spades'),new Card('7','Diamonds')]);


        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('Queen','Hearts'),
            new Card('Jack','Spades'),
            new Card('3','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result[0].user.id).to.equal(user1.id);
    });


    it('two pair card even', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('9','Hearts'),new Card('7','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('7','Diamonds')]);


        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('9','Hearts'),
            new Card('7','Spades'),
            new Card('3','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result.length).to.equal(2);
    });

    it('two pair highest card', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('9','Hearts'),new Card('8','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('10','Diamonds')]);


        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('9','Hearts'),
            new Card('7','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result[0].user.id).to.equal(user2.id);
    });

    it('two pair highest pair only one has', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('6', 'Hearts'), new Card('8', 'Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9', 'Spades'), new Card('10', 'Diamonds')]);


        const cards: Card[] = [
            new Card('2', 'Diamonds'),
            new Card('6', 'Hearts'),
            new Card('7', 'Spades'),
            new Card('7', 'Hearts'),
            new Card('10', 'Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result[0].user.id).to.equal(user2.id);
    });


    it('two pair only one has', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('6','Hearts'),new Card('4','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('10','Diamonds')]);


        const cards:Card[] = [
            new Card('2','Diamonds'),
            new Card('9','Hearts'),
            new Card('7','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        expect(result[0].user.id).to.equal(user2.id);
    });

    it('three of a kind only one has', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('6','Hearts'),new Card('8','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('10','Diamonds')]);


        const cards:Card[] = [
            new Card('6','Diamonds'),
            new Card('6','Spades'),
            new Card('7','Spades'),
            new Card('10','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        expect(result[0].user.id).to.equal(user1.id);
    });


    it('three of a kind bigger three of a kind', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('6','Hearts'),new Card('6','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('9','Diamonds')]);


        const cards:Card[] = [
            new Card('6','Diamonds'),
            new Card('5','Spades'),
            new Card('9','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        expect(result[0].user.id).to.equal(user2.id);
    });

    it('three of a kind even highest card', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('6','Hearts'),new Card('2','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('6','Clubs')]);


        const cards:Card[] = [
            new Card('6','Diamonds'),
            new Card('6','Spades'),
            new Card('4','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result[0].user.id).to.equal(user2.id);
    });



    it('three of a kind even ', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('6','Hearts'),new Card('9','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('6','Clubs')]);


        const cards:Card[] = [
            new Card('6','Diamonds'),
            new Card('6','Spades'),
            new Card('4','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(2);
    });


    it('straight only one has ', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Hearts'),new Card('3','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('6','Clubs')]);


        const cards:Card[] = [
            new Card('6','Diamonds'),
            new Card('5','Spades'),
            new Card('8','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result[0].user.id).to.equal(user2.id);
    });

    it('straight even ', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('9','Hearts'),new Card('3','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('6','Clubs')]);


        const cards:Card[] = [
            new Card('6','Diamonds'),
            new Card('5','Spades'),
            new Card('8','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        console.log(result[1].cards);
        expect(result.length).to.equal(2);
    });

    it('straight highest card win ', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('9','Hearts'),new Card('3','Clubs')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('6','Diamonds'),
            new Card('5','Spades'),
            new Card('8','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(1);
        expect(result[0].user.id).to.equal(user2.id);
    });


    it('flush only one has', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('9','Hearts'),new Card('3','Hearts')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('6','Diamonds'),
            new Card('5','Spades'),
            new Card('8','Hearts'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(1);
        expect(result[0].user.id).to.equal(user1.id);
    });

    it('flush even', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('4','Hearts'),new Card('3','Hearts')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('10','Hearts'),
            new Card('Ace','Hearts'),
            new Card('8','Hearts'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(2);
    });

    it('flush highest card win', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('Ace','Hearts'),new Card('3','Hearts')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('10','Hearts'),
            new Card('2','Hearts'),
            new Card('8','Hearts'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(1);
        expect(result[0].user.id).to.equal(user1.id);
    });


    it('full house only one has', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Hearts'),new Card('3','Hearts')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Spades'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('5','Clubs'),
            new Card('2','Spades'),
            new Card('5','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(1);
        expect(result[0].user.id).to.equal(user1.id);
    });

    it('full house even', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Hearts'),new Card('3','Hearts')]);
        let hand2: Hand = new Hand(user2, [new Card('2','Clubs'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('5','Clubs'),
            new Card('2','Spades'),
            new Card('5','Spades'),
            new Card('7','Hearts'),
            new Card('5','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(2);
    });



    it('full house highest win', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Clubs'),new Card('3','Hearts')]);
        let hand2: Hand = new Hand(user2, [new Card('5','Hearts'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('5','Clubs'),
            new Card('2','Spades'),
            new Card('5','Spades'),
            new Card('7','Hearts'),
            new Card('2','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(1);
        expect(result[0].user.id).to.equal(user2.id);
    });


    it('full house highest pair win', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Clubs'),new Card('7','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('2','Diamonds'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('5','Clubs'),
            new Card('2','Spades'),
            new Card('5','Spades'),
            new Card('7','Hearts'),
            new Card('2','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(1);
        expect(result[0].user.id).to.equal(user1.id);
    });


    it('full house highest pair win', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Clubs'),new Card('7','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('2','Diamonds'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('5','Clubs'),
            new Card('2','Spades'),
            new Card('5','Spades'),
            new Card('7','Hearts'),
            new Card('2','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(1);
        expect(result[0].user.id).to.equal(user1.id);
    });


    it('four of a kind only one has', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('5','Diamonds'),new Card('5','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('2','Diamonds'),new Card('10','Clubs')]);


        const cards:Card[] = [
            new Card('5','Clubs'),
            new Card('2','Spades'),
            new Card('5','Hearts'),
            new Card('7','Hearts'),
            new Card('2','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(1);
        expect(result[0].user.id).to.equal(user1.id);
    });


    it('four of a kind bigger four of a kind', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('5','Diamonds'),new Card('5','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('2','Diamonds'),new Card('2','Clubs')]);


        const cards:Card[] = [
            new Card('5','Clubs'),
            new Card('2','Spades'),
            new Card('5','Hearts'),
            new Card('7','Hearts'),
            new Card('2','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result[0].user.id).to.equal(user1.id);
    });


    it('straight flush only one has', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('4','Hearts'),new Card('5','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('2','Diamonds'),new Card('2','Clubs')]);


        const cards:Card[] = [
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('8','Hearts'),
            new Card('7','Hearts'),
            new Card('2','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result[0].user.id).to.equal(user1.id);
    });


    it('straight flush even higher cards', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('4','Hearts'),new Card('5','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('9','Hearts'),new Card('2','Clubs')]);


        const cards:Card[] = [
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('8','Hearts'),
            new Card('7','Hearts'),
            new Card('2','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result[0].user.id).to.equal(user2.id);
    });

    it('straight flush even ', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('4','Hearts'),new Card('5','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('3','Hearts'),new Card('2','Clubs')]);


        const cards:Card[] = [
            new Card('5','Hearts'),
            new Card('6','Hearts'),
            new Card('8','Hearts'),
            new Card('7','Hearts'),
            new Card('9','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(2);
    });

    it('royal flush only one has ', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('Ace','Hearts'),new Card('5','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('3','Hearts'),new Card('2','Clubs')]);


        const cards:Card[] = [
            new Card('10','Hearts'),
            new Card('Jack','Hearts'),
            new Card('Queen','Hearts'),
            new Card('King','Hearts'),
            new Card('9','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result[0].user.id).to.equal(user1.id);
    });

    it('royal flush even ', () => {

        let user1 = new User();
        user1.id = 1;
        user1.username = 'user1';
        let user2 = new User();
        user2.id = 2;
        user2.username = 'user2';
        let user3 = new User();
        user3.id = 3;
        user3.username = 'user3';

        let hand1: Hand = new Hand(user1, [new Card('2','Hearts'),new Card('5','Spades')]);
        let hand2: Hand = new Hand(user2, [new Card('3','Hearts'),new Card('2','Clubs')]);


        const cards:Card[] = [
            new Card('10','Hearts'),
            new Card('Jack','Hearts'),
            new Card('Queen','Hearts'),
            new Card('King','Hearts'),
            new Card('Ace','Hearts')

        ];

        const result: ResultHand[] = evaluateWinner([ hand1,  hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        expect(result.length).to.equal(2);
    });
});