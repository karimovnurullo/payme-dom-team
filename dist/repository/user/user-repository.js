import { alertFunction } from "../../alert.js";
const localStorageKey = 'users';
export class UserRepository {
    constructor() {
        this.list = JSON.parse(localStorage.getItem("users") || "[]");
        this.id = 0;
    }
    isExist(phoneNumber) {
        for (const user of this.list) {
            if (user.phoneNumber === phoneNumber)
                return true;
        }
        return false;
    }
    create(...users) {
        for (const user of users) {
            if (this.isExist(user.phoneNumber)) {
                alertFunction(`User ${user.phoneNumber} already exists`, false);
                throw new Error(`User ${user.phoneNumber} already exists`);
            }
            user.setId(++this.id);
            this.list.push(user);
            localStorage.setItem("users", JSON.stringify(this.list));
        }
    }
    getById(userID) {
        for (const user of this.list) {
            if (user.getId() === userID)
                return user;
        }
        alertFunction(`User ${userID} not found`, false);
        throw new Error(`User ${userID} not found`);
    }
    getByNumber(userNumber) {
        for (const user of this.list) {
            if (user.phoneNumber === userNumber)
                return user;
        }
        alertFunction(`User ${userNumber} not found`, false);
        throw new Error(`User ${userNumber} not found`);
    }
    delete(userID) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].getId() === userID) {
                this.list.splice(i, 1);
                alertFunction(`User with id ${userID} has been deleted successfully`, true);
                return `User with id ${userID} has been deleted successfully`;
            }
        }
        alertFunction(`${userID} User not found`, false);
    }
    getList() {
        return this.list;
    }
}
