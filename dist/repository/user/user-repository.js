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
                throw new Error(`User ${user.getNumber()} already exists`);
            user.setId(++this.id);
            this.list.push(user);
        }
    }
    getById(userID) {
        for (const user of this.list) {
            if (user.getId() === userID)
                return user;
        }
        throw new Error(`User ${userID} not found`);
    }
    getByNumber(userNumber) {
        for (const user of this.list) {
            if (user.getNumber() === userNumber)
                return user;
        }
        throw new Error(`User ${userNumber} not found`);
    }
    delete(userID) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].getId() === userID) {
                this.list.splice(i, 1);
                return `User with id ${userID} has been deleted successfully`;
            }
        }
        throw new Error(`${userID} User not found`);
    }
    getList() {
        return this.list;
    }
}
