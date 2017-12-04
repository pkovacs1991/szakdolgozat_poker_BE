"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TableStatus_1 = require("../entity/TableStatus");
var User_1 = require("../entity/User");
var Message_1 = require("../entity/Message");
var PokerTable_1 = require("../entity/PokerTable");
var typeorm_1 = require("typeorm");
var Action_1 = require("../entity/Action");
var PokerService = /** @class */ (function () {
    function PokerService() {
        this.users = [];
        this.isNew = false;
    }
    PokerService.prototype.joinUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var tableId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isJoined(user)) {
                            this.users.push(user);
                        }
                        if (!(this.users.length > 1)) return [3 /*break*/, 3];
                        if (!(this.users.length == 2 && !this.tableStatus)) return [3 /*break*/, 2];
                        tableId = 4;
                        return [4 /*yield*/, this.newGame(0, tableId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, JSON.stringify(this.tableStatus)];
                    case 3: return [2 /*return*/, JSON.stringify({ message: "You should wait for another user" })];
                }
            });
        });
    };
    PokerService.prototype.foldUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var users, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users = this.tableStatus.activeUsers;
                        for (i = 0; i < users.length; i++) {
                            if (user.id === users[i].id) {
                                this.tableStatus.removeUserFromUserAction(user);
                                users.splice(i, 1);
                                break;
                            }
                        }
                        console.log(this.tableStatus.possibleRaiseActions);
                        if (!(users.length === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.endGame()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!this.canAnyOneRaise()) {
                            this.tableStatus.doNextStatus();
                            return [2 /*return*/, JSON.stringify(this.tableStatus)];
                        }
                        else {
                            this.nextUser();
                            return [2 /*return*/, JSON.stringify(this.tableStatus)];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PokerService.prototype.callUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, i, userBet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.tableStatus.userBets.length)) return [3 /*break*/, 4];
                        userBet = this.tableStatus.userBets[i];
                        if (!(userBet.user.id === user.id)) return [3 /*break*/, 3];
                        this.tableStatus.pot += this.tableStatus.currentBet - userBet.currentBet;
                        user.balance -= this.tableStatus.currentBet - userBet.currentBet;
                        userBet.bet += this.tableStatus.currentBet - userBet.currentBet;
                        userBet.currentBet = this.tableStatus.currentBet;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.emptyUserAction(user);
                        console.log(this.tableStatus.possibleRaiseActions);
                        console.log(this.canAnyOneRaise());
                        if (!this.canAnyOneRaise()) {
                            this.tableStatus.doNextStatus();
                        }
                        else {
                            this.nextUser();
                        }
                        return [2 /*return*/, JSON.stringify(this.tableStatus)];
                }
            });
        });
    };
    PokerService.prototype.raiseUser = function (user, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, i, userBet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.tableStatus.userBets.length)) return [3 /*break*/, 4];
                        userBet = this.tableStatus.userBets[i];
                        if (!(userBet.user.id === user.id)) return [3 /*break*/, 3];
                        this.tableStatus.pot += +amount;
                        user.balance -= +amount;
                        userBet.bet += +amount;
                        this.tableStatus.currentBet = +amount + userBet.currentBet;
                        userBet.currentBet += +amount;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.setCallUsersAction(user);
                        console.log(this.tableStatus.possibleRaiseActions);
                        this.nextUser();
                        console.log('next user ' + this.tableStatus.turn.id);
                        return [2 /*return*/, JSON.stringify(this.tableStatus)];
                }
            });
        });
    };
    PokerService.prototype.checkUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.emptyUserAction(user);
                console.log(this.tableStatus.possibleRaiseActions);
                console.log(this.canAnyOneRaise());
                if (!this.canAnyOneRaise()) {
                    console.log('im here');
                    this.tableStatus.doNextStatus();
                }
                else {
                    this.nextUser();
                }
                return [2 /*return*/, JSON.stringify(this.tableStatus)];
            });
        });
    };
    PokerService.prototype.emptyUserAction = function (user) {
        var possibleRaiseActions = this.tableStatus.possibleRaiseActions;
        for (var i = 0; i < possibleRaiseActions.length; i++) {
            if (user.id === possibleRaiseActions[i].user.id) {
                possibleRaiseActions[i].actions = [];
                break;
            }
        }
    };
    PokerService.prototype.setCallUsersAction = function (user) {
        this.emptyUserAction(user);
        var possibleRaiseActions = this.tableStatus.possibleRaiseActions;
        for (var i = 0; i < possibleRaiseActions.length; i++) {
            if (user.id !== possibleRaiseActions[i].user.id) {
                this.addRaiseOption(possibleRaiseActions[i], Action_1.Action.CALL);
            }
        }
    };
    PokerService.prototype.addRaiseOption = function (possibleRaiseAction, action) {
        var containAction = false;
        for (var i = 0; i < possibleRaiseAction.actions.length; i++) {
            if (possibleRaiseAction.actions[i] === action) {
                containAction = true;
            }
        }
        if (!containAction) {
            possibleRaiseAction.actions.push(action);
        }
    };
    PokerService.prototype.canAnyOneRaise = function () {
        var canRaise = false;
        var possibleRaiseActions = this.tableStatus.possibleRaiseActions;
        for (var i = 0; i < possibleRaiseActions.length; i++) {
            if (possibleRaiseActions[i].actions.length > 0) {
                canRaise = true;
                break;
            }
        }
        return canRaise;
    };
    PokerService.prototype.nextUser = function () {
        var users = this.tableStatus.activeUsers;
        for (var i = 0; i < users.length; i++) {
            if (this.tableStatus.turn.id === users[i].id) {
                this.tableStatus.turn = users[this.nextActiveIndex(i)];
                break;
            }
        }
    };
    PokerService.prototype.nextActiveIndex = function (index) {
        console.log(index + 1);
        console.log(this.tableStatus.activeUsers.length);
        console.log(index + 1 < this.tableStatus.activeUsers.length ? index + 1 : 0);
        return index + 1 < this.tableStatus.activeUsers.length ? index + 1 : 0;
    };
    PokerService.prototype.nextIndex = function (index) {
        return index + 1 < this.users.length ? index + 1 : 0;
    };
    PokerService.prototype.newGame = function (dealer, tableId) {
        return __awaiter(this, void 0, void 0, function () {
            var pokerTableRepository, table, smallBlindIndex, bigBlindIndex, turnIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pokerTableRepository = typeorm_1.getManager().getRepository(PokerTable_1.PokerTable);
                        return [4 /*yield*/, pokerTableRepository.findOneById(tableId)];
                    case 1:
                        table = _a.sent();
                        this.dealer = dealer;
                        smallBlindIndex = this.nextIndex(dealer);
                        bigBlindIndex = this.nextIndex(smallBlindIndex);
                        turnIndex = this.nextIndex(bigBlindIndex);
                        this.tableStatus = new TableStatus_1.TableStatus(this.users[smallBlindIndex], this.users[bigBlindIndex], this.users[turnIndex], this.users, table);
                        return [2 /*return*/];
                }
            });
        });
    };
    PokerService.prototype.endGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var winner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tableStatus.activeUsers.length == 1) {
                            winner = this.tableStatus.activeUsers[0];
                        }
                        return [4 /*yield*/, this.handleMoney(winner)];
                    case 1:
                        _a.sent();
                        this.tableStatus.isEnd = true;
                        return [2 /*return*/, JSON.stringify({ winner: winner })];
                }
            });
        });
    };
    PokerService.prototype.handleMoney = function (winner) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, i, user_1, userBet, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.tableStatus.users.length)) return [3 /*break*/, 4];
                        user_1 = this.tableStatus.users[i];
                        if (!(user_1.id != winner.id)) return [3 /*break*/, 3];
                        userBet = this.getUserBet(user_1);
                        user_1.balance = user_1.balance - userBet;
                        return [4 /*yield*/, userRepository.save(user_1)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        user = winner;
                        user.balance += this.tableStatus.pot;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PokerService.prototype.getUserBet = function (user) {
        var userBet = 0;
        for (var i = 0; i < this.tableStatus.userBets.length; i++) {
            if (this.tableStatus.userBets[i].user.id == user.id) {
                userBet = this.tableStatus.userBets[i].bet;
            }
        }
        return userBet;
    };
    PokerService.prototype.handleMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var content, contentJSON;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentJSON = JSON.parse(message.content);
                        console.log(contentJSON.action);
                        if (!(contentJSON.action === 'JOINED')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.joinUser(message.from)];
                    case 1:
                        content = _a.sent();
                        return [3 /*break*/, 13];
                    case 2:
                        if (!(contentJSON.action === 'FOLD')) return [3 /*break*/, 6];
                        console.log('call fold');
                        return [4 /*yield*/, this.foldUser(message.from)];
                    case 3:
                        content = _a.sent();
                        if (!this.tableStatus.isEnd) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.newGame(this.nextIndex(this.dealer), 4)];
                    case 4:
                        _a.sent();
                        this.isNew = true;
                        _a.label = 5;
                    case 5: return [3 /*break*/, 13];
                    case 6:
                        if (!(contentJSON.action === 'CHECK')) return [3 /*break*/, 8];
                        console.log('call check');
                        return [4 /*yield*/, this.checkUser(message.from)];
                    case 7:
                        content = _a.sent();
                        return [3 /*break*/, 13];
                    case 8:
                        if (!(contentJSON.action === 'CALL')) return [3 /*break*/, 10];
                        console.log('call call');
                        return [4 /*yield*/, this.callUser(message.from)];
                    case 9:
                        content = _a.sent();
                        return [3 /*break*/, 13];
                    case 10:
                        if (!(contentJSON.action === 'RAISE')) return [3 /*break*/, 12];
                        console.log('call raise' + message.from.username);
                        return [4 /*yield*/, this.raiseUser(message.from, contentJSON.amount)];
                    case 11:
                        content = _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        content = JSON.stringify({ message: 'bad message' });
                        _a.label = 13;
                    case 13: return [2 /*return*/, new Message_1.Message(message.from, content)];
                }
            });
        });
    };
    PokerService.prototype.isJoined = function (user) {
        var isJoined = false;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i] && this.users[i].id === user.id) {
                isJoined = true;
            }
        }
        return isJoined;
    };
    return PokerService;
}());
exports.PokerService = PokerService;
