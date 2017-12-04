"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EvaluateHandService_1 = require("../src/service/EvaluateHandService");
var chai_1 = require("chai");
require("mocha");
var Card_1 = require("../src/entity/Card");
var User_1 = require("../src/entity/User");
var Hand_1 = require("../src/entity/Hand");
var evaluateWinner = EvaluateHandService_1.EvaluateHandService.evaluateWinner;
describe('Evaluate Hand ', function () {
    it('one pair even', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Hearts'), new Card_1.Card('4', 'Diamonds')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('2', 'Spades'), new Card_1.Card('4', 'Hearts')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('Jack', 'Spades'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result.length).to.equal(2);
    });
    it('one pair both high hand', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Hearts'), new Card_1.Card('4', 'Diamonds')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('2', 'Spades'), new Card_1.Card('King', 'Diamonds')]);
        var hand3 = new Hand_1.Hand(user3, [new Card_1.Card('2', 'Clubs'), new Card_1.Card('10', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('Jack', 'Spades'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand3, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('one pair ', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Hearts'), new Card_1.Card('4', 'Diamonds')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('6', 'Spades'), new Card_1.Card('7', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('Jack', 'Spades'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('one pair won highest pair', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Hearts'), new Card_1.Card('4', 'Diamonds')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('3', 'Spades'), new Card_1.Card('7', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('Jack', 'Spades'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('highest card even', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('8', 'Hearts'), new Card_1.Card('7', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('8', 'Spades'), new Card_1.Card('7', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('Jack', 'Spades'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result.length).to.equal(2);
    });
    it('highest card won highest', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('9', 'Hearts'), new Card_1.Card('7', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('8', 'Spades'), new Card_1.Card('7', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('Jack', 'Spades'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('two pair card even', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('9', 'Hearts'), new Card_1.Card('7', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('7', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('9', 'Hearts'),
            new Card_1.Card('7', 'Spades'),
            new Card_1.Card('3', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result.length).to.equal(2);
    });
    it('two pair highest card', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('9', 'Hearts'), new Card_1.Card('8', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('9', 'Hearts'),
            new Card_1.Card('7', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('two pair highest pair only one has', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('6', 'Hearts'), new Card_1.Card('8', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('7', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('10', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('two pair only one has', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('6', 'Hearts'), new Card_1.Card('4', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Diamonds')]);
        var cards = [
            new Card_1.Card('2', 'Diamonds'),
            new Card_1.Card('9', 'Hearts'),
            new Card_1.Card('7', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        //console.log(result[1].cards);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('three of a kind only one has', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('6', 'Hearts'), new Card_1.Card('8', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Diamonds')]);
        var cards = [
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('6', 'Spades'),
            new Card_1.Card('7', 'Spades'),
            new Card_1.Card('10', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('three of a kind bigger three of a kind', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('6', 'Hearts'), new Card_1.Card('6', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('9', 'Diamonds')]);
        var cards = [
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('9', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('three of a kind even highest card', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('6', 'Hearts'), new Card_1.Card('2', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('6', 'Clubs')]);
        var cards = [
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('6', 'Spades'),
            new Card_1.Card('4', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('three of a kind even ', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('6', 'Hearts'), new Card_1.Card('9', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('6', 'Clubs')]);
        var cards = [
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('6', 'Spades'),
            new Card_1.Card('4', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(2);
    });
    it('straight only one has ', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Hearts'), new Card_1.Card('3', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('6', 'Clubs')]);
        var cards = [
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('8', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('straight even ', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('9', 'Hearts'), new Card_1.Card('3', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('6', 'Clubs')]);
        var cards = [
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('8', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        console.log(result[1].cards);
        chai_1.expect(result.length).to.equal(2);
    });
    it('straight highest card win ', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('9', 'Hearts'), new Card_1.Card('3', 'Clubs')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('8', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(1);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('flush only one has', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('9', 'Hearts'), new Card_1.Card('3', 'Hearts')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('6', 'Diamonds'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('8', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(1);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('flush even', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('4', 'Hearts'), new Card_1.Card('3', 'Hearts')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('10', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts'),
            new Card_1.Card('8', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(2);
    });
    it('flush highest card win', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('Ace', 'Hearts'), new Card_1.Card('3', 'Hearts')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('10', 'Hearts'),
            new Card_1.Card('2', 'Hearts'),
            new Card_1.Card('8', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(1);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('full house only one has', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Hearts'), new Card_1.Card('3', 'Hearts')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Spades'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Clubs'),
            new Card_1.Card('2', 'Spades'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(1);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('full house even', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Hearts'), new Card_1.Card('3', 'Hearts')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('2', 'Clubs'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Clubs'),
            new Card_1.Card('2', 'Spades'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('5', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(2);
    });
    it('full house highest win', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Clubs'), new Card_1.Card('3', 'Hearts')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('5', 'Hearts'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Clubs'),
            new Card_1.Card('2', 'Spades'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('2', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(1);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('full house highest pair win', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Clubs'), new Card_1.Card('7', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('2', 'Diamonds'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Clubs'),
            new Card_1.Card('2', 'Spades'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('2', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(1);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('full house highest pair win', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Clubs'), new Card_1.Card('7', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('2', 'Diamonds'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Clubs'),
            new Card_1.Card('2', 'Spades'),
            new Card_1.Card('5', 'Spades'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('2', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(1);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('four of a kind only one has', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('5', 'Diamonds'), new Card_1.Card('5', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('2', 'Diamonds'), new Card_1.Card('10', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Clubs'),
            new Card_1.Card('2', 'Spades'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('2', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(1);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('four of a kind bigger four of a kind', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('5', 'Diamonds'), new Card_1.Card('5', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('2', 'Diamonds'), new Card_1.Card('2', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Clubs'),
            new Card_1.Card('2', 'Spades'),
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('2', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('straight flush only one has', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('4', 'Hearts'), new Card_1.Card('5', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('2', 'Diamonds'), new Card_1.Card('2', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('8', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('2', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('straight flush even higher cards', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('4', 'Hearts'), new Card_1.Card('5', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('9', 'Hearts'), new Card_1.Card('2', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('8', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('2', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result[0].user.id).to.equal(user2.id);
    });
    it('straight flush even ', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('4', 'Hearts'), new Card_1.Card('5', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('3', 'Hearts'), new Card_1.Card('2', 'Clubs')]);
        var cards = [
            new Card_1.Card('5', 'Hearts'),
            new Card_1.Card('6', 'Hearts'),
            new Card_1.Card('8', 'Hearts'),
            new Card_1.Card('7', 'Hearts'),
            new Card_1.Card('9', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(2);
    });
    it('royal flush only one has ', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('Ace', 'Hearts'), new Card_1.Card('5', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('3', 'Hearts'), new Card_1.Card('2', 'Clubs')]);
        var cards = [
            new Card_1.Card('10', 'Hearts'),
            new Card_1.Card('Jack', 'Hearts'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('King', 'Hearts'),
            new Card_1.Card('9', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result[0].user.id).to.equal(user1.id);
    });
    it('royal flush even ', function () {
        var user1 = new User_1.User();
        user1.id = 1;
        user1.username = 'user1';
        var user2 = new User_1.User();
        user2.id = 2;
        user2.username = 'user2';
        var user3 = new User_1.User();
        user3.id = 3;
        user3.username = 'user3';
        var hand1 = new Hand_1.Hand(user1, [new Card_1.Card('2', 'Hearts'), new Card_1.Card('5', 'Spades')]);
        var hand2 = new Hand_1.Hand(user2, [new Card_1.Card('3', 'Hearts'), new Card_1.Card('2', 'Clubs')]);
        var cards = [
            new Card_1.Card('10', 'Hearts'),
            new Card_1.Card('Jack', 'Hearts'),
            new Card_1.Card('Queen', 'Hearts'),
            new Card_1.Card('King', 'Hearts'),
            new Card_1.Card('Ace', 'Hearts')
        ];
        var result = evaluateWinner([hand1, hand2], cards);
        console.log(result);
        console.log(result[0].cards);
        chai_1.expect(result.length).to.equal(2);
    });
});
