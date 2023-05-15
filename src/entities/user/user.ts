export class User{
   private id: number;

   constructor(public firstName: string, public lastName: string, public phoneNumber: string, public password: string){};

   setId(userID: number){
      this.id = userID;
   }
   getId(){
      return this.id;
   }
   getNumber(){
      return this.phoneNumber;
   }
}