"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("./Card");
var Hand_1 = require("./Hand");
var Cards = /** @class */ (function () {
    function Cards() {
        this.createNewDeck();
    }
    Cards.prototype.createNewDeck = function () {
        var newCards = [];
        newCards.push(new Card_1.Card('2', 'Hearts'));
        newCards.push(new Card_1.Card('3', 'Hearts'));
        newCards.push(new Card_1.Card('4', 'Hearts'));
        newCards.push(new Card_1.Card('5', 'Hearts'));
        newCards.push(new Card_1.Card('6', 'Hearts'));
        newCards.push(new Card_1.Card('7', 'Hearts'));
        newCards.push(new Card_1.Card('8', 'Hearts'));
        newCards.push(new Card_1.Card('9', 'Hearts'));
        newCards.push(new Card_1.Card('10', 'Hearts'));
        newCards.push(new Card_1.Card('Jack', 'Hearts'));
        newCards.push(new Card_1.Card('Queen', 'Hearts'));
        newCards.push(new Card_1.Card('King', 'Hearts'));
        newCards.push(new Card_1.Card('Ace', 'Hearts'));
        newCards.push(new Card_1.Card('2', 'Diamonds'));
        newCards.push(new Card_1.Card('3', 'Diamonds'));
        newCards.push(new Card_1.Card('4', 'Diamonds'));
        newCards.push(new Card_1.Card('5', 'Diamonds'));
        newCards.push(new Card_1.Card('6', 'Diamonds'));
        newCards.push(new Card_1.Card('7', 'Diamonds'));
        newCards.push(new Card_1.Card('8', 'Diamonds'));
        newCards.push(new Card_1.Card('9', 'Diamonds'));
        newCards.push(new Card_1.Card('10', 'Diamonds'));
        newCards.push(new Card_1.Card('Jack', 'Diamonds'));
        newCards.push(new Card_1.Card('Queen', 'Diamonds'));
        newCards.push(new Card_1.Card('King', 'Diamonds'));
        newCards.push(new Card_1.Card('Ace', 'Diamonds'));
        newCards.push(new Card_1.Card('2', 'Clubs'));
        newCards.push(new Card_1.Card('3', 'Clubs'));
        newCards.push(new Card_1.Card('4', 'Clubs'));
        newCards.push(new Card_1.Card('5', 'Clubs'));
        newCards.push(new Card_1.Card('6', 'Clubs'));
        newCards.push(new Card_1.Card('7', 'Clubs'));
        newCards.push(new Card_1.Card('8', 'Clubs'));
        newCards.push(new Card_1.Card('9', 'Clubs'));
        newCards.push(new Card_1.Card('10', 'Clubs'));
        newCards.push(new Card_1.Card('Jack', 'Clubs'));
        newCards.push(new Card_1.Card('Queen', 'Clubs'));
        newCards.push(new Card_1.Card('King', 'Clubs'));
        newCards.push(new Card_1.Card('Ace', 'Clubs'));
        newCards.push(new Card_1.Card('2', 'Spades'));
        newCards.push(new Card_1.Card('3', 'Spades'));
        newCards.push(new Card_1.Card('4', 'Spades'));
        newCards.push(new Card_1.Card('5', 'Spades'));
        newCards.push(new Card_1.Card('6', 'Spades'));
        newCards.push(new Card_1.Card('7', 'Spades'));
        newCards.push(new Card_1.Card('8', 'Spades'));
        newCards.push(new Card_1.Card('9', 'Spades'));
        newCards.push(new Card_1.Card('10', 'Spades'));
        newCards.push(new Card_1.Card('Jack', 'Spades'));
        newCards.push(new Card_1.Card('Queen', 'Spades'));
        newCards.push(new Card_1.Card('King', 'Spades'));
        newCards.push(new Card_1.Card('Ace', 'Spades'));
        this.cards = newCards;
    };
    Cards.prototype.deal = function (users) {
        var hands = [];
        for (var i = 0; i < users.length; i++) {
            var card1 = this.getRandomCard();
            var card2 = this.getRandomCard();
            hands.push(new Hand_1.Hand(users[i], [card1, card2]));
        }
        return hands;
    };
    Cards.prototype.getRandomCard = function () {
        var rand = Math.floor(Math.random() * this.cards.length);
        var card = this.cards[rand];
        this.cards.splice(rand, 1);
        return card;
    };
    Cards.prototype.flop = function () {
        var card1 = this.getRandomCard();
        var card2 = this.getRandomCard();
        var card3 = this.getRandomCard();
        return [card1, card2, card3];
    };
    Cards.prototype.river = function () {
        return this.getRandomCard();
    };
    Cards.prototype.turn = function () {
        return this.getRandomCard();
    };
    return Cards;
}());
exports.Cards = Cards;
