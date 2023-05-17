import { alertFunction } from "../../alert.js";
export class CardRepository {
    constructor() {
        this.list = JSON.parse(localStorage.getItem("cards") || "[]");
        this.counter = 0;
    }
    isExist(cardNumber) {
        for (const card of this.list) {
            if (card.number === cardNumber)
                return true;
        }
        return false;
    }
    create(...cards) {
        for (const card of cards) {
            if (this.isExist(card.number)) {
                alertFunction(`Card(${card.number}) is already exist`, false);
                throw new Error(`Card(${card.number}) is already exist`);
            }
            card.setId(++this.counter);
            this.list.push(card);
            localStorage.setItem("cards", JSON.stringify(this.list));
        }
    }
    getByID(cardID) {
        for (const card of this.list) {
            if (card.getId() === cardID)
                return card;
        }
        alertFunction(`Card ${cardID} not found`, false);
        throw new Error(`Card ${cardID} not found`);
    }
    getList() {
        return this.list;
    }
}
