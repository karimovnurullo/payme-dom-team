"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        this.list = [];
        this.id = 0;
    }
    UserRepository.prototype.isExist = function (phoneNumber) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.getNumber() == phoneNumber)
                return true;
        }
        return false;
    };
    UserRepository.prototype.create = function () {
        var users = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            users[_i] = arguments[_i];
        }
        for (var _a = 0, users_1 = users; _a < users_1.length; _a++) {
            var user = users_1[_a];
            if (this.isExist(user.getNumber()))
                throw new Error("User ".concat(user.getNumber(), " already exists"));
            user.setId(++this.id);
            this.list.push(user);
        }
    };
    UserRepository.prototype.getById = function (userID) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.getId() === userID)
                return user;
        }
        throw new Error("User ".concat(userID, " not found"));
    };
    UserRepository.prototype.getByNumber = function (userNumber) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.getNumber() === userNumber)
                return user;
        }
        throw new Error("User ".concat(userNumber, " not found"));
    };
    UserRepository.prototype.delete = function (userID) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].getId() === userID) {
                this.list.splice(i, 1);
                return "User with id ".concat(userID, " has been deleted successfully");
            }
        }
        throw new Error("".concat(userID, " User not found"));
    };
    UserRepository.prototype.getList = function () {
        return this.list;
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
