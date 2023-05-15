import { Card } from "../entities/card/card";
import { User } from "../entities/user/user";
import { CardRepository } from "../repository/card/card-repository";
import { UserRepository } from "../repository/user/user-repository";


export class MainService {
   private cardRepository = new CardRepository();
   private userRepository = new UserRepository();
   private history: { fromCard: string, toCard: string, amount: number, date: string }[] = [];

   register(...users: User[]) {
      this.userRepository.create(...users);
   }

   login(phoneNumber: string, password: string) {
      const currentUser = this.userRepository.getByNumber(phoneNumber);

      if (currentUser.password !== password) throw new Error("Passwords don't match");
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

   getCardByUserId(userId: number): Card[] {
      let userCards: Card[] = [];
      for (const card of this.cardRepository.getList()) {
         const ownerId: number = card.getOwnerId();
         if (ownerId === userId) {
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
      else this.cardRepository.getList()[fromCardIndex].setBlock(false);
   }

   isCardNumber(cardNumber: string): boolean {
      for (const card of this.cardRepository.getList()) {
         if (card.getNumber() === cardNumber) return true;
      }
      return false;
   }

   getUserId(userId: number) {
      return this.cardRepository.getByID(userId);
   }

   getTransactionHistory() {
      return this.history;
   }
}


