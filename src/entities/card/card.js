"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(number, expiry, type, balance, ownerId, bankName) {
        this.number = number;
        this.expiry = expiry;
        this.type = type;
        this.balance = balance;
        this.ownerId = ownerId;
        this.bankName = bankName;
        this.isBlocked = false;
    }
    ;
    Card.prototype.setId = function (cardId) {
        this.id = cardId;
    };
    ;
    Card.prototype.getOwnerId = function () {
        return this.ownerId;
    };
    Card.prototype.setBlock = function (block) {
        this.isBlocked = block;
    };
    Card.prototype.getBlock = function () {
        return this.isBlocked;
    };
    Card.prototype.getBalance = function () {
        return this.balance;
    };
    Card.prototype.updatedBalance = function (newBalance) {
        this.balance += newBalance;
    };
    Card.prototype.getId = function () {
        return this.id;
    };
    Card.prototype.getNumber = function () {
        return this.number;
    };
    return Card;
}());
exports.Card = Card;
