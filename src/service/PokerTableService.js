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
var PokerTable_1 = require("../entity/PokerTable");
var typeorm_1 = require("typeorm");
var AuhService_1 = require("./AuhService");
var PokerTableRepository_1 = require("../repository/PokerTableRepository");
var PokerTableNotFoundException_1 = require("../exception/PokerTableNotFoundException");
var PokerTableService;
(function (PokerTableService) {
    function getTables(req) {
        return __awaiter(this, void 0, void 0, function () {
            var pokerTableRepository, pokerTable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pokerTableRepository = typeorm_1.getManager().getRepository(PokerTable_1.PokerTable);
                        return [4 /*yield*/, AuhService_1.AuthService.isLoggedIn(req)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pokerTableRepository.find({ relations: ["users"] })];
                    case 2:
                        pokerTable = _a.sent();
                        return [2 /*return*/, pokerTable];
                }
            });
        });
    }
    PokerTableService.getTables = getTables;
    function getTable(id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var pokerTableRepository, pokerTable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pokerTableRepository = typeorm_1.getManager().getRepository(PokerTable_1.PokerTable);
                        return [4 /*yield*/, AuhService_1.AuthService.isLoggedIn(req)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pokerTableRepository.findOneById(id, { relations: ["users"] })];
                    case 2:
                        pokerTable = _a.sent();
                        return [2 /*return*/, pokerTable];
                }
            });
        });
    }
    PokerTableService.getTable = getTable;
    function createTable(pokerTableJSON, req) {
        return __awaiter(this, void 0, void 0, function () {
            var pokerTableRepository, pokerTable, newPokerTable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pokerTableRepository = typeorm_1.getManager().getCustomRepository(PokerTableRepository_1.PokerTableRepository);
                        return [4 /*yield*/, AuhService_1.AuthService.isAdminLoggedIn(req)];
                    case 1:
                        _a.sent();
                        pokerTable = pokerTableRepository.createFromJson(pokerTableJSON);
                        pokerTable.actualBid = pokerTable.minBid;
                        pokerTable.users = new Array();
                        return [4 /*yield*/, pokerTableRepository.save(pokerTable)];
                    case 2:
                        newPokerTable = _a.sent();
                        return [2 /*return*/, (newPokerTable)];
                }
            });
        });
    }
    PokerTableService.createTable = createTable;
    function updateTable(id, pokerTable, req) {
        return __awaiter(this, void 0, void 0, function () {
            var response, pokerTableRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pokerTableRepository = typeorm_1.getManager().getRepository(PokerTable_1.PokerTable);
                        return [4 /*yield*/, AuhService_1.AuthService.isAdminLoggedIn(req)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pokerTableRepository.updateById(id, pokerTable)
                                .then(function (a) { return response = true; })
                                .catch(function (err) {
                                response = false;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    }
    PokerTableService.updateTable = updateTable;
    function deletePokerTable(id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var response, pokerTableRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = true;
                        pokerTableRepository = typeorm_1.getManager().getRepository(PokerTable_1.PokerTable);
                        return [4 /*yield*/, AuhService_1.AuthService.isAdminLoggedIn(req)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pokerTableRepository.removeById(id)
                                .then(function (a) { return response = true; })
                                .catch(function (err) {
                                response = false;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    }
    PokerTableService.deletePokerTable = deletePokerTable;
    function joinTable(id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var response, pokerTableRepository, pokerTable, e_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = true;
                        pokerTableRepository = typeorm_1.getManager().getRepository(PokerTable_1.PokerTable);
                        return [4 /*yield*/, AuhService_1.AuthService.isLoggedIn(req)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, getPokerTable(id)];
                    case 3:
                        pokerTable = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (e_1 instanceof PokerTableNotFoundException_1.PokerTableNotFoundException) {
                            response = false;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, AuhService_1.AuthService.currentUser(req)];
                    case 6:
                        user = _a.sent();
                        pokerTable.users.push(user);
                        console.log(pokerTable);
                        return [4 /*yield*/, pokerTableRepository.save(pokerTable)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    }
    PokerTableService.joinTable = joinTable;
    function leaveTable(id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var response, pokerTableRepository, pokerTable, e_2, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = true;
                        pokerTableRepository = typeorm_1.getManager().getRepository(PokerTable_1.PokerTable);
                        return [4 /*yield*/, AuhService_1.AuthService.isLoggedIn(req)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, getPokerTable(id)];
                    case 3:
                        pokerTable = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        if (e_2 instanceof PokerTableNotFoundException_1.PokerTableNotFoundException) {
                            response = false;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, AuhService_1.AuthService.currentUser(req)];
                    case 6:
                        user = _a.sent();
                        pokerTable = removeUserFromTable(pokerTable, user);
                        return [4 /*yield*/, pokerTableRepository.save(pokerTable)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    }
    PokerTableService.leaveTable = leaveTable;
    function removeUserFromTable(pokerTable, user) {
        var index;
        for (var i = 0; i < pokerTable.users.length; i++) {
            if (pokerTable.users[i].id == user.id) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            pokerTable.users.splice(index, 1);
        }
        return pokerTable;
    }
    function getPokerTable(id) {
        return __awaiter(this, void 0, void 0, function () {
            var pokerTableRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pokerTableRepository = typeorm_1.getManager().getRepository(PokerTable_1.PokerTable);
                        return [4 /*yield*/, pokerTableRepository.findOneById(id, { relations: ["users"] })
                                .then(function (table) {
                                return table;
                            })
                                .catch(function (err) {
                                throw new PokerTableNotFoundException_1.PokerTableNotFoundException();
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
})(PokerTableService = exports.PokerTableService || (exports.PokerTableService = {}));
