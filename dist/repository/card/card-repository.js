export class CardRepository {
    constructor() {
        this.list = [];
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
            if (this.isExist(card.number))
                throw new Error(`Card(${card.number}) is already exist`);
            card.setId(++this.counter);
            this.list.push(card);
        }
    }
    getByID(cardID) {
        for (const card of this.list) {
            if (card.getId() === cardID)
                return card;
        }
        throw new Error(`Card ${cardID} not found`);
    }
    getList() {
        return this.list;
    }
}
