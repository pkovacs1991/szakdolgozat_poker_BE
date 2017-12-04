"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = /** @class */ (function () {
    function Card(number, color) {
        this.number = number;
        this.color = color;
        if (number === 'Jack') {
            this.value = 11;
        }
        else if (number === 'Queen') {
            this.value = 12;
        }
        else if (number === 'King') {
            this.value = 13;
        }
        else if (number === 'Ace') {
            this.value = 14;
        }
        else {
            this.value = +number;
        }
    }
    return Card;
}());
exports.Card = Card;
