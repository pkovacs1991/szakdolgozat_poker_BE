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
var UserService_1 = require("../service/UserService");
var NotAuthenticatedException_1 = require("../exception/NotAuthenticatedException");
var NotAuthorizedException_1 = require("../exception/NotAuthorizedException");
var UserController = /** @class */ (function () {
    /**
     * Initialize the AuthController
     */
    function UserController() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * Modify a user.
     */
    UserController.prototype.putModify = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, user, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        user = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserService_1.UserService.modifyUser(id, user, req)];
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
                        e_1 = _a.sent();
                        if (e_1 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Modify Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_1 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
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
     * Delete a User by Id.
     */
    UserController.prototype.deleteUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserService_1.UserService.deleteUser(id, req)];
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
                        e_2 = _a.sent();
                        if (e_2 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Delete Failed!, Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_2 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
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
     * Get the User by Id.
     */
    UserController.prototype.getUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserService_1.UserService.getUser(id, req)];
                    case 2:
                        response = _a.sent();
                        if (!response) {
                            message = {
                                response: "User not found"
                            };
                            res.status(400);
                        }
                        else {
                            message = response;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        if (e_3 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_3 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Not Authorized"
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
     * Get the Users.
     */
    UserController.prototype.getUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var message, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserService_1.UserService.getUsers(req)];
                    case 1:
                        message = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        if (e_4 instanceof NotAuthenticatedException_1.NotAuthenticatedException) {
                            message = {
                                response: "Not authenticated"
                            };
                            res.status(403);
                        }
                        if (e_4 instanceof NotAuthorizedException_1.NotAuthoreizedException) {
                            message = {
                                response: "Not Authorized"
                            };
                            res.status(403);
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        console.log(message);
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
    UserController.prototype.init = function () {
        this.router.put('/:id', this.putModify);
        this.router.delete('/:id', this.deleteUser);
        this.router.get('/:id', this.getUser);
        this.router.get('', this.getUsers);
    };
    return UserController;
}());
exports.UserController = UserController;
// Create the UserController, and export its configured Express.Router
var userController = new UserController();
userController.init();
exports.default = userController.router;
