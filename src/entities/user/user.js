"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(firstName, lastName, phoneNumber, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
    ;
    User.prototype.setId = function (userID) {
        this.id = userID;
    };
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getNumber = function () {
        return this.phoneNumber;
    };
    return User;
}());
exports.User = User;
