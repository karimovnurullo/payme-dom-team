import { CardRepository } from "../repository/card/card-repository";
import { UserRepository } from "../repository/user/user-repository";
export class MainService {
    constructor() {
        this.cardRepository = new CardRepository();
        this.userRepository = new UserRepository();
        this.history = [];
    }
    register(...users) {
        this.userRepository.create(...users);
    }
    login(phoneNumber, password) {
        const currentUser = this.userRepository.getByNumber(phoneNumber);
        if (currentUser.password !== password)
            throw new Error("Passwords don't match");
        return currentUser;
    }
    registerCard(...cards) {
        this.cardRepository.create(...cards);
    }
    getUserList() {
        return this.userRepository.getList();
    }
    getCardList() {
        return this.cardRepository.getList();
    }
    getCardByUserId(userId) {
        let userCards = [];
        for (const card of this.cardRepository.getList()) {
            const ownerId = card.getOwnerId();
            if (ownerId === userId) {
                userCards.push(card);
            }
        }
        return userCards;
    }
    transaction(fromCard, toCard, money) {
        let fromCardExists = false;
        let toCardExists = false;
        let fromCardIndex = -1;
        let toCardIndex = -1;
        for (let i = 0; i < this.cardRepository.getList().length; i++) {
            const card = this.cardRepository.getList()[i];
            if (card.getNumber() === fromCard) {
                fromCardExists = true;
                fromCardIndex = i;
            }
            if (card.getNumber() === toCard) {
                toCardExists = true;
                toCardIndex = i;
            }
            if (fromCardExists && toCardExists)
                break;
        }
        if (!fromCardExists || !toCardExists) {
            throw new Error('One or both cards do not exist');
        }
        const fromCardBalance = this.cardRepository.getList()[fromCardIndex].getBalance();
        if (fromCardBalance < money) {
            throw new Error(`You have not enough money`);
        }
        this.cardRepository.getList()[fromCardIndex].updatedBalance(-money);
        this.cardRepository.getList()[toCardIndex].updatedBalance(money);
        const now = new Date();
        const date = `${now.getDate() < 10 ? '0' : ''}${now.getDate()}.${(now.getMonth() + 1) < 10 ? '0' : ''}${now.getMonth() + 1}.${now.getFullYear()} - ${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}:${now.getSeconds() < 10 ? '0' : ''}${now.getSeconds()}`;
        this.history.push({ fromCard, toCard, amount: money, date: date });
        if (this.cardRepository.getList()[fromCardIndex].getBalance() === 0) {
            this.cardRepository.getList()[fromCardIndex].setBlock(true);
        }
        else
            this.cardRepository.getList()[fromCardIndex].setBlock(false);
    }
    isCardNumber(cardNumber) {
        for (const card of this.cardRepository.getList()) {
            if (card.getNumber() === cardNumber)
                return true;
        }
        return false;
    }
    getUserId(userId) {
        return this.cardRepository.getByID(userId);
    }
    getTransactionHistory() {
        return this.history;
    }
}
