export class Card {
    constructor(number, expiry, type, balance, ownerId, bankName) {
        this.number = number;
        this.expiry = expiry;
        this.type = type;
        this.balance = balance;
        this.ownerId = ownerId;
        this.bankName = bankName;
        this.isBlocked = false;
    }
    ;
    setId(cardId) {
        this.id = cardId;
    }
    ;
    getOwnerId() {
        return this.ownerId;
    }
    setBlock(block) {
        this.isBlocked = block;
    }
    getBlock() {
        return this.isBlocked;
    }
    getBalance() {
        return this.balance;
    }
    updatedBalance(newBalance) {
        this.balance += newBalance;
    }
    getId() {
        return this.id;
    }
    getNumber() {
        return this.number;
    }
}
