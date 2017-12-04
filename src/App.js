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
var express = require("express");
var session = require("express-session");
var logger = require("morgan");
var bodyParser = require("body-parser");
var http = require("http");
var socketIo = require("socket.io");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var AuthController_1 = require("./controller/AuthController");
var UserController_1 = require("./controller/UserController");
var PokerTableController_1 = require("./controller/PokerTableController");
var Message_1 = require("./entity/Message");
var PokerService_1 = require("./service/PokerService");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        var _this = this;
        this.express = express();
        this.middleware();
        this.routes();
        typeorm_1.createConnection().then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var admin, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        admin = new User_1.User();
                        admin.id = 1;
                        admin.username = 'admin';
                        admin.password = '1234';
                        admin.email = 'admin@admin.com';
                        admin.balance = 500;
                        admin.firstName = 'admin';
                        admin.lastName = 'admin';
                        admin.isAdmin = true;
                        return [4 /*yield*/, admin.save()];
                    case 1:
                        _a.sent();
                        console.log("Loading users from the database...");
                        return [4 /*yield*/, connection.manager.find(User_1.User)];
                    case 2:
                        users = _a.sent();
                        console.log("Loaded users: ", users);
                        return [2 /*return*/];
                }
            });
        }); }).catch(function (error) { return console.log(error); });
        this.server = http.createServer(this.express);
        this.config();
        this.sockets();
        this.listen();
        console.log("Server started in localhost:3000");
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(session({ secret: 'ssshhhhh', resave: false, saveUninitialized: true }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
            next();
        });
        this.express.use('/api/v1/auth', AuthController_1.default);
        this.express.use('/api/v1/user', UserController_1.default);
        this.express.use('/api/v1/table', PokerTableController_1.default);
    };
    App.prototype.config = function () {
        this.port = process.env.PORT || App.PORT;
    };
    App.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    App.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        var pokerService = new PokerService_1.PokerService();
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('message', function (m) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pokerService.handleMessage(m)];
                        case 1:
                            m = _a.sent();
                            //console.log('[server](message): %s', JSON.stringify(m));
                            this.io.emit('message', m);
                            if (pokerService.isNew) {
                                //console.log('[server](message): %s', JSON.stringify(m));
                                this.io.emit('message', new Message_1.Message(m.from, JSON.stringify(pokerService.tableStatus)));
                                pokerService.isNew = false;
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    // ref to Express instance
    App.PORT = 8080;
    return App;
}());
exports.default = new App().express;
