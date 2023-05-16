import { Card } from "../../entities/card/card";
import { alertFunction } from "../../alert";
export class CardRepository{
   private list: Card[] = [];
   private counter: number = 0;

   isExist(cardNumber: string): boolean{
      for (const card of this.list) {
         if(card.number === cardNumber) return true;
      }
      return false;
   }

   create(...cards: Card[]){
      for (const card of cards) {
         if(this.isExist(card.number)) alertFunction(`Card(${card.number}) is already exist`, false);
         card.setId(++this.counter)
         this.list.push(card);
      }
   }
   getByID(cardID: number): Card{
      for (const card of this.list) {
         if(card.getId()=== cardID) return card;
      }
      alertFunction(`Card ${cardID} not found`, false);
      throw new Error(`Card ${cardID} not found`);
   }
   getList():Card[] {
      return this.list;
   }
}


