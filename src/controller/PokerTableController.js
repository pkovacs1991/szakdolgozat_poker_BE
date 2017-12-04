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
var express_1 = require("express");
var PokerTableService_1 = require("../service/PokerTableService");
var NotAuthenticatedException_1 = require("../exception/NotAuthenticatedException");
var NotAuthorizedException_1 = require("../exception/NotAuthorizedException");
var PokerTableController = /** @class */ (function () {
    /**
     * Initialize the AuthController
     */
    function PokerTableController() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * Create a new Poker table.
     */
    PokerTableController.prototype.postCreateTable = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var message, newUser, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PokerTableService_1.PokerTableService.createTable(req.body, req)];
                    case 1:
                        newUser = _a.sent();
                        if (newUser.id) {
                            message = newUser;
                        }
                        else {
                            message = {
                                response: "Create Failed!"
                            };
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Create Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_1 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Create Failed!, Not Authorized"
                            };
                            res.status(403);
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        res.header('Content-type', 'application/json');
                        res.send(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update a Poker table.
     */
    PokerTableController.prototype.putUpdateTable = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, pokerTable, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        pokerTable = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, PokerTableService_1.PokerTableService.updateTable(id, pokerTable, req)];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            message = {
                                response: "Modify Success!"
                            };
                        }
                        else {
                            message = {
                                response: "Modify Failed!"
                            };
                            res.status(400);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        if (e_2 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Modify Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_2 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Modify Failed!, Not Authorized"
                            };
                            res.status(403);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        res.header('Content-type', 'application/json');
                        res.send(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a Poker table.
     */
    PokerTableController.prototype.deleteTable = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        console.log(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, PokerTableService_1.PokerTableService.deletePokerTable(id, req)];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            message = {
                                response: "Delete Success!"
                            };
                        }
                        else {
                            message = {
                                response: "Delete Failed!"
                            };
                            res.status(400);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        if (e_3 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Delete Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_3 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Delete Failed!, Not Authorized"
                            };
                            res.status(403);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        res.header('Content-type', 'application/json');
                        res.send(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a Poker table by Id.
     */
    PokerTableController.prototype.getTable = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, user, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, PokerTableService_1.PokerTableService.getTable(id, req)];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            message = user;
                        }
                        else {
                            message = {
                                response: "Poker Table not found!"
                            };
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        if (e_4 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Poker Table get Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_4 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Poker Table get Failed!, Not Authorized"
                            };
                            res.status(403);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        res.header('Content-type', 'application/json');
                        res.send(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all Poker table.
     */
    PokerTableController.prototype.getTables = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var message, user, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PokerTableService_1.PokerTableService.getTables(req)];
                    case 1:
                        user = _a.sent();
                        message = user;
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        if (e_5 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Poker Tables get Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_5 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Poker Tables get Failed!, Not Authorized"
                            };
                            res.status(403);
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        res.header('Content-type', 'application/json');
                        res.send(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Join a user into a Poker table.
     */
    PokerTableController.prototype.getJoinTable = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, response, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, PokerTableService_1.PokerTableService.joinTable(id, req)];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            message = {
                                response: "Join Success!"
                            };
                        }
                        else {
                            message = {
                                response: "Join Failed!"
                            };
                            res.status(400);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        if (e_6 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Join Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_6 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Join Failed!, Not Authorized"
                            };
                            res.status(403);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        res.header('Content-type', 'application/json');
                        res.send(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Leave a user from a Poker table.
     */
    PokerTableController.prototype.getLeaveTable = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, response, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, PokerTableService_1.PokerTableService.leaveTable(id, req)];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            message = {
                                response: "Leave Success!"
                            };
                        }
                        else {
                            message = {
                                response: "Leave Failed!"
                            };
                            res.status(400);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        if (e_7 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Leave Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_7 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Leave Failed!, Not Authorized"
                            };
                            res.status(403);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        res.header('Content-type', 'application/json');
                        res.send(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    PokerTableController.prototype.init = function () {
        this.router.get('/', this.getTables);
        this.router.get('/:id', this.getTable);
        this.router.post('/', this.postCreateTable);
        this.router.put('/:id', this.putUpdateTable);
        this.router.delete('/:id', this.deleteTable);
        this.router.get('/join/:id', this.getJoinTable);
        this.router.get('/leave/:id', this.getLeaveTable);
    };
    return PokerTableController;
}());
exports.PokerTableController = PokerTableController;
// Create the AuthController, and export its configured Express.Router
var pokerTableController = new PokerTableController();
pokerTableController.init();
exports.default = pokerTableController.router;
