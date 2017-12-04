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
var UserRepository_1 = require("../repository/UserRepository");
var NotAuthenticatedException_1 = require("../exception/NotAuthenticatedException");
var NotAuthorizedException_1 = require("../exception/NotAuthorizedException");
var jwt_simple_1 = require("jwt-simple");
var AuthService;
(function (AuthService) {
    function loginUser(req) {
        return __awaiter(this, void 0, void 0, function () {
            var userJSON, userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userJSON = req.body;
                        console.log(req.body);
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne(userJSON)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, (user)];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    AuthService.loginUser = loginUser;
    function currentUser(req) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        return [4 /*yield*/, isLoggedIn(req)];
                    case 1:
                        _a.sent();
                        id = getIdByToken(req);
                        return [4 /*yield*/, userRepository.findOneById(id)];
                    case 2:
                        user = _a.sent();
                        console.log(id);
                        console.log(user);
                        return [2 /*return*/, user];
                }
            });
        });
    }
    AuthService.currentUser = currentUser;
    function registerUser(userJSON) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(userJSON);
                        userRepository = typeorm_1.getManager().getCustomRepository(UserRepository_1.UserRepository);
                        user = userRepository.createFromJson(userJSON);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 1:
                        newUser = _a.sent();
                        console.log("User has been saved. User id is", newUser.id);
                        return [2 /*return*/, (newUser)];
                }
            });
        });
    }
    AuthService.registerUser = registerUser;
    function isAdminLoggedIn(req) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, id, loggedInUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getManager().getRepository(User_1.User);
                        return [4 /*yield*/, isLoggedIn(req)];
                    case 1:
                        _a.sent();
                        id = getIdByToken(req);
                        return [4 /*yield*/, userRepository.findOneById(id)];
                    case 2:
                        loggedInUser = _a.sent();
                        if (!loggedInUser.isAdmin) {
                            throw new NotAuthorizedException_1.NotAuthoreizedException();
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    AuthService.isAdminLoggedIn = isAdminLoggedIn;
    function isLoggedIn(req) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = getIdByToken(req);
                if (!id) {
                    throw new NotAuthenticatedException_1.NotAuthenticatedException();
                }
                return [2 /*return*/];
            });
        });
    }
    AuthService.isLoggedIn = isLoggedIn;
    function getIdByToken(req) {
        var token = req.header('token');
        var decoded = jwt_simple_1.decode(token, 'secret', true);
        console.log(decoded);
        console.log(decoded.id);
        return decoded.id;
    }
})(AuthService = exports.AuthService || (exports.AuthService = {}));
