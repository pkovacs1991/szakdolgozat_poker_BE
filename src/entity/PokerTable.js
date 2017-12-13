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
var User_1 = require("./User");
var PokerTable = /** @class */ (function (_super) {
    __extends(PokerTable, _super);
    function PokerTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], PokerTable.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true })
    ], PokerTable.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column()
    ], PokerTable.prototype, "minBid", void 0);
    __decorate([
        typeorm_1.Column()
    ], PokerTable.prototype, "maxBid", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return User_1.User; }, function (user) { return user.pokerTable; })
    ], PokerTable.prototype, "users", void 0);
    PokerTable = __decorate([
        typeorm_1.Entity()
    ], PokerTable);
    return PokerTable;
}(typeorm_1.BaseEntity));
exports.PokerTable = PokerTable;
