import { Card } from "../../entities/card/card.js";
import { alertFunction } from "../../alert.js";
export class CardRepository{
   private list: Card[] = JSON.parse(localStorage.getItem("cards") || "[]");
   private counter: number = 0;

   isExist(cardNumber: string): boolean{
      for (const card of this.list) {
         if(card.number === cardNumber) return true;
      }
      return false;
   }

   create(...cards: Card[]){
      for (const card of cards) {
         if(this.isExist(card.number)){
            alertFunction(`Card(${card.number}) is already exist`, false);
            throw new Error(`Card(${card.number}) is already exist`);
         }
         card.setId(++this.counter)
         this.list.push(card);
         localStorage.setItem("cards", JSON.stringify(this.list));
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


