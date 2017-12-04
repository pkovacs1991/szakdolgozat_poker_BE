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
var User_1 = require("../entity/User");
var typeorm_1 = require("typeorm");
var AuhService_1 = require("./AuhService");
var UserService;
(function (UserService) {
    function getUser(id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        return [4 /*yield*/, AuhService_1.AuthService.isAdminLoggedIn(req)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, userRepository.findOneById(id)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    }
    UserService.getUser = getUser;
    function getUsers(req) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        return [4 /*yield*/, AuhService_1.AuthService.isAdminLoggedIn(req)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, userRepository.find()];
                    case 2:
                        users = _a.sent();
                        console.log(users);
                        return [2 /*return*/, users];
                }
            });
        });
    }
    UserService.getUsers = getUsers;
    function deleteUser(id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var response, userRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        return [4 /*yield*/, AuhService_1.AuthService.isAdminLoggedIn(req)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, userRepository.removeById(id)
                                .then(function (a) { return response = true; })
                                .catch(function (err) {
                                console.log(err);
                                response = false;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    }
    UserService.deleteUser = deleteUser;
    function modifyUser(id, user, req) {
        return __awaiter(this, void 0, void 0, function () {
            var response, userRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        return [4 /*yield*/, AuhService_1.AuthService.isLoggedIn(req)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, userRepository.updateById(id, user)
                                .then(function (a) { return response = true; })
                                .catch(function (err) {
                                console.log(err);
                                response = false;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    }
    UserService.modifyUser = modifyUser;
})(UserService = exports.UserService || (exports.UserService = {}));
