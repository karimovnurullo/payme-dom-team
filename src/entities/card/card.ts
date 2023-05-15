import { CARD_TYPE } from "../type/type";
export class Card {
   private id: number;

   constructor(public number: string, public expiry: string, public type: CARD_TYPE, public balance: number, public ownerId: number, public bankName: string) {
   };

   setId(cardId: number) {
      this.id = cardId;
   };
   getOwnerId() {
      return this.ownerId;
   }
   private isBlocked: boolean = false;


   setBlock(block: boolean) {
      this.isBlocked = block;
   }
   getBlock() {
      return this.isBlocked;
   }

   getBalance() {
      return this.balance;
   }

   updatedBalance(newBalance: number) {
      this.balance += newBalance;
   }

   getId() {
      return this.id;
   }
   getNumber() {
      return this.number;
   }

}