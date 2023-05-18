import { Card } from "../entities/card/card.js";
import { User } from "../entities/user/user.js";
import { CardRepository } from "../repository/card/card-repository.js";
import { UserRepository } from "../repository/user/user-repository.js";
import { alertFunction } from "../alert.js";

export class MainService {
   private cardRepository = new CardRepository();
   private userRepository = new UserRepository();
   private history: { fromCard: string, toCard: string, amount: number, date: string }[] = [];

   register(...users: User[]) {
      this.userRepository.create(...users);
   }

   login(phoneNumber: number, password: string) {
      const currentUser = this.userRepository.getByNumber(phoneNumber);
      if (currentUser.password !== password) {
         alertFunction("Passwords don't match", false);
         throw new Error("Passwords don't match");
      }
      return currentUser;
   }

   registerCard(...cards: Card[]) {
      this.cardRepository.create(...cards);
   }

   getUserList(): User[] {
      return this.userRepository.getList();
   }

   getCardList(): Card[] {
      return this.cardRepository.getList();
   }

   // getCardByUserId(userId: number): Card[] {
   //    let getCards = JSON.parse(localStorage.getItem("cards")!) as Card[];
   //    let cards = Object.setPrototypeOf(getCards, Card.prototype) as Card[];

   //    let userCards: Card[] = [];
   //    for (const card of cards) {
   //       const ownerId: number = card.getOwnerId();
   //       if (ownerId === userId) {
   //          userCards.push(card);
   //       }
   //    }
   //    return userCards;
   // }

   getCardByUserId(userId: number): Card[] {
   const getCards = JSON.parse(localStorage.getItem("cards")!) as Card[];
   const cards = getCards.map(cardData => Object.setPrototypeOf(cardData, Card.prototype))

   const userCards: Card[] = [];
   for (const card of cards) {
      if (card.getOwnerId() === userId) {
         userCards.push(card);
      }
   }
   return userCards;
}


   transaction(fromCard: string, toCard: string, money: number) {
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
         if (fromCardExists && toCardExists) break;
      }

      if (!fromCardExists || !toCardExists) {
         alertFunction('One or both cards do not exist', false);
         // throw new Error('One or both cards do not exist');
      }
      const fromCardBalance = this.cardRepository.getList()[fromCardIndex].getBalance();

      if (fromCardBalance < money) {
         alertFunction(`You have not enough money`, false);
         // throw new Error(`You have not enough money`);
      }

      this.cardRepository.getList()[fromCardIndex].updatedBalance(-money);
      this.cardRepository.getList()[toCardIndex].updatedBalance(money);
      const now = new Date();
      const date = `${now.getDate() < 10 ? '0' : ''}${now.getDate()}.${(now.getMonth() + 1) < 10 ? '0' : ''}${now.getMonth() + 1}.${now.getFullYear()} - ${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}:${now.getSeconds() < 10 ? '0' : ''}${now.getSeconds()}`;

      this.history.push({ fromCard, toCard, amount: money, date: date });
      if (this.cardRepository.getList()[fromCardIndex].getBalance() === 0) {
         this.cardRepository.getList()[fromCardIndex].setBlock(true);
      }
      else this.cardRepository.getList()[fromCardIndex].setBlock(false);
   }

   isCardNumber(cardNumber: string): boolean {
      for (const card of this.cardRepository.getList()) {
         if (card.getNumber() === cardNumber) return true;
      }
      return false;
   }

   getUserId(userId: number) {
      return this.userRepository.getById(userId);
   }
   getUserByNumber(userNumber: number){
      return this.userRepository.getByNumber(userNumber);
   }

   getTransactionHistory() {
      return this.history;
   }
}


