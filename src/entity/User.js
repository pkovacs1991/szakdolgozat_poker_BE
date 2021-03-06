"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var PokerTable_1 = require("./PokerTable");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true })
    ], User.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ unique: true })
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "balance", void 0);
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "isAdmin", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return PokerTable_1.PokerTable; }, function (pokerTable) { return pokerTable.users; })
    ], User.prototype, "pokerTable", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
