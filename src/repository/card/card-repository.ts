import { Card } from "../../entities/card/card";
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
         if(this.isExist(card.number)) throw new Error(`Card(${card.number}) is already exist`);
         card.setId(++this.counter)
         this.list.push(card);
      }
   }
   getByID(cardID: number): Card{
      for (const card of this.list) {
         if(card.getId()=== cardID) return card;
      }
      throw new Error(`Card ${cardID} not found`);
   }
   getList():Card[] {
      return this.list;
   }
}


