import { Card } from "./entities/card/card";
import { User } from "./entities/user/user";
import { MainService } from "./services/main-service";
const mainService = new MainService();
const user1 = new User("Nurullo", "Karimov", "+998905640618", "root123");
const user2 = new User("Amirxon", "Abralov", "+99890444222", "12221ss");
mainService.register(user1, user2);
const card1 = new Card("8600000100020003", "12/25", "HUMO", 10000, user1.getId(), "TBC Bank");
const card2 = new Card("8600000100020004", "12/25", "HUMO", 20000, user2.getId(), "NBU Bank");
const card3 = new Card("8600000100020005", "12/25", "HUMO", 10000, user1.getId(), "TBC Bank");
try {
    mainService.registerCard(card1, card2, card3);
    mainService.transaction("8600000100020003", "8600000100020005", 10000);
    mainService.transaction("8600000100020005", "8600000100020003", 100);
    mainService.transaction("8600000100020004", "8600000100020003", 5000);
    console.log("Cards", mainService.getCardList());
    console.log("History: ", mainService.getTransactionHistory());
}
catch (error) {
    // console.error(error.message);
}
