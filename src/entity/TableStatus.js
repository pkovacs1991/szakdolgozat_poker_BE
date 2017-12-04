"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status_1 = require("./Status");
var Cards_1 = require("./Cards");
var UserBet_1 = require("./UserBet");
var PossibleRaiseAction_1 = require("./PossibleRaiseAction");
var Action_1 = require("./Action");
var TableStatus = /** @class */ (function () {
    function TableStatus(smallBlind, bigBlind, turn, users, table) {
        this.userBets = [];
        this.tableCards = [];
        this.possibleRaiseActions = [];
        this.table = table;
        this.status = Status_1.Status.PRE_FLOP;
        this.users = users.slice();
        this.activeUsers = users.slice();
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.currentBet = table.minBid * 2;
        this.turn = turn;
        this.pot = 0;
        this.cards = new Cards_1.Cards();
        this.deal();
        this.setBets();
        this.setPossibleRaiseActions();
        this.isEnd = false;
    }
    TableStatus.prototype.deal = function () {
        this.hand = this.cards.deal(this.users);
    };
    TableStatus.prototype.setBets = function () {
        this.setSmallBlind();
        this.setBigBlind();
        this.setOthers();
        this.pot = this.table.minBid * 3;
    };
    TableStatus.prototype.setSmallBlind = function () {
        var bet = new UserBet_1.UserBet(this.smallBlind, this.table.minBid, this.table.minBid);
        this.userBets.push(bet);
    };
    TableStatus.prototype.setBigBlind = function () {
        var bet = new UserBet_1.UserBet(this.bigBlind, this.table.minBid * 2, this.table.minBid * 2);
        this.userBets.push(bet);
    };
    TableStatus.prototype.setOthers = function () {
        for (var i = 0; i < this.users.length; i++) {
            if (this.isOther(this.users[i])) {
                var bet = new UserBet_1.UserBet(this.users[i], 0, 0);
                this.userBets.push(bet);
            }
        }
    };
    TableStatus.prototype.setPossibleRaiseActions = function () {
        this.possibleRaiseActions = [];
        for (var i = 0; i < this.activeUsers.length; i++) {
            var possibleRaiseAction = new PossibleRaiseAction_1.PossibleRaiseAction(this.users[i], [Action_1.Action.CALL, Action_1.Action.RAISE]);
            this.possibleRaiseActions.push(possibleRaiseAction);
        }
    };
    TableStatus.prototype.removeUserFromUserAction = function (user) {
        for (var i = 0; i < this.possibleRaiseActions.length; i++) {
            if (user.id === this.possibleRaiseActions[i].user.id) {
                this.possibleRaiseActions.splice(i, 1);
                break;
            }
        }
    };
    TableStatus.prototype.isOther = function (user) {
        return user.id != this.smallBlind.id && user.id != this.bigBlind.id;
    };
    TableStatus.prototype.doNextStatus = function () {
        if (this.status === Status_1.Status.PRE_FLOP) {
            console.log('im here pre flop');
            this.doFlop();
        }
        else if (this.status === Status_1.Status.FLOP) {
            this.doTurn();
        }
        else if (this.status === Status_1.Status.TURN) {
            this.doRiver();
        }
        else if (this.status === Status_1.Status.RIVER) {
            this.evaluateWinner();
        }
    };
    TableStatus.prototype.doFlop = function () {
        this.status = Status_1.Status.FLOP;
        this.tableCards = this.tableCards.concat(this.cards.flop());
        this.turn = this.smallBlind;
        this.setPossibleRaiseActions();
    };
    TableStatus.prototype.doTurn = function () {
        this.status = Status_1.Status.TURN;
        this.tableCards = this.tableCards.concat(this.cards.turn());
        this.turn = this.smallBlind;
        this.setPossibleRaiseActions();
    };
    TableStatus.prototype.doRiver = function () {
        this.status = Status_1.Status.RIVER;
        this.tableCards = this.tableCards.concat(this.cards.river());
        this.turn = this.smallBlind;
        this.setPossibleRaiseActions();
    };
    TableStatus.prototype.evaluateWinner = function () {
    };
    return TableStatus;
}());
exports.TableStatus = TableStatus;
