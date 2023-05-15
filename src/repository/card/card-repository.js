"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRepository = void 0;
var CardRepository = /** @class */ (function () {
    function CardRepository() {
        this.list = [];
        this.counter = 0;
    }
    CardRepository.prototype.isExist = function (cardNumber) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.number === cardNumber)
                return true;
        }
        return false;
    };
    CardRepository.prototype.create = function () {
        var cards = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cards[_i] = arguments[_i];
        }
        for (var _a = 0, cards_1 = cards; _a < cards_1.length; _a++) {
            var card = cards_1[_a];
            if (this.isExist(card.number))
                throw new Error("Card(".concat(card.number, ") is already exist"));
            card.setId(++this.counter);
            this.list.push(card);
        }
    };
    CardRepository.prototype.getByID = function (cardID) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.getId() === cardID)
                return card;
        }
        throw new Error("Card ".concat(cardID, " not found"));
    };
    CardRepository.prototype.getList = function () {
        return this.list;
    };
    return CardRepository;
}());
exports.CardRepository = CardRepository;
