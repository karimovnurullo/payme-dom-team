import { alertFunction } from "../../alert.js";
export class UserRepository {
    constructor() {
        this.list = [];
        this.id = 0;
    }
    isExist(phoneNumber) {
        for (const user of this.list) {
            if (user.getNumber() === phoneNumber)
                return true;
        }
        return false;
    }
    create(...users) {
        for (const user of users) {
            if (this.isExist(user.getNumber()))
                alertFunction(`User ${user.getNumber()} already exists`, false);
            user.setId(++this.id);
            this.list.push(user);
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
            if (user.getNumber() === userNumber)
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
        // throw new Error(`${userID} User not found`);
    }
    getList() {
        return this.list;
    }
}
