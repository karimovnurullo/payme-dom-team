import { Card } from "./entities/card/card.js";
import { User } from "./entities/user/user.js";
import { MainService } from "./services/main-service.js";
import { alertFunction } from "./alert.js";
import { BANK_TYPE, CARDTYPE, CARD_TYPE } from "./entities/type/type.js";
// import { CARD_TYPE } from "./entities/type/type";
// function init() {
const container = document.querySelector<HTMLDivElement>('.container')!;
const loginPage = document.querySelector<HTMLDivElement>('.login-page')!;
const cabinetPage = document.querySelector<HTMLDivElement>('.cabinet')!;
const switchLoginFormBtn = document.querySelector<HTMLDivElement>('.login-btn')!;
const switchRegisterFormBtn = document.querySelector<HTMLDivElement>('.create-btn')!;
const userFirstname = document.querySelector<HTMLDivElement>('.user-firstname')!;
const userLastname = document.querySelector<HTMLDivElement>('.user-lastname')!;
const userNumber = document.querySelector<HTMLDivElement>('.user-number')!;
const userPassword = document.querySelector<HTMLDivElement>('.user-password')!;
const userCard = document.querySelector<HTMLDivElement>('.user-card')!;
const modes = document.querySelectorAll('.mode')!;
const modeIcon = document.querySelectorAll('.mode-icon')!;
const logoutBtn = document.querySelector('.logout-btn')!;
const forms = document.querySelectorAll('.form') as NodeListOf<HTMLFormElement>;
const inputs = document.querySelectorAll('.form input[type="text"], .form input[type="password"]') as NodeListOf<HTMLInputElement>;
const loginForm = document.querySelector<HTMLFormElement>('.login-form')!;
const loginNumber = document.querySelector<HTMLInputElement>('.login-number')!;
const loginPassword = document.querySelector<HTMLInputElement>('.login-password')!;
const registerForm = document.querySelector<HTMLFormElement>('.sign-form')!;
const registerFirsname = document.querySelector<HTMLInputElement>('.sign-firsname')!;
const registerLastname = document.querySelector<HTMLInputElement>('.sign-lastname')!;
const registerNumber = document.querySelector<HTMLInputElement>('.sign-number')!;
const registerPassword = document.querySelector<HTMLInputElement>('.sign-password')!;

// ============================== Card Form Start =============================

const cardForm = document.querySelector<HTMLFormElement>('.card-form')!;
const cardNumber = document.querySelector<HTMLInputElement>('.card-number')!;
const cardExpiry = document.querySelector<HTMLInputElement>('.card-date')!;
const cardBalance = document.querySelector<HTMLInputElement>('.card-balance')!;
const cardBankName = document.querySelector<HTMLSelectElement>('.card-bankname')!;
const cardType = document.querySelector<HTMLSelectElement>('.card-type')!;

// ============================== Card Form End =============================
(function darkMode() {
   if (localStorage.getItem('mode') === 'dark') {
      container.classList.add('dark');
      modeIcon.forEach(icon => icon.classList.replace('uil-moon', 'uil-sun'));
   }
   modes.forEach(mode => {
      mode.addEventListener('click', () => {
         modeIcon.forEach(icon => {
            const { classList } = icon;
            ['uil-moon', 'uil-sun'].forEach(cls => classList.toggle(cls));
         });
         container.classList.toggle('dark');
         if (container.classList.contains('dark')) {
            localStorage.setItem('mode', 'dark');
         } else {
            localStorage.removeItem('mode');
         }
      });
   });
}());

function switchForm(hide: any, show: any) {
   hide.classList.add('hide');
   show.classList.remove('hide');
}
function switchPage(active: boolean) {
   localStorage.setItem("cabinate", JSON.stringify(active));
   let getCabinate = JSON.parse(localStorage.getItem("cabinate")!);
   if (getCabinate) {
      loginPage.classList.add("hide");
      cabinetPage.classList.remove("hide");
   }
   else {
      cabinetPage.classList.add("hide");
      loginPage.classList.remove("hide");
   }
}

function isCabinate(active: boolean) {
   localStorage.setItem("cabinate", JSON.stringify(active))
   switchPage(JSON.parse(localStorage.getItem("cabinate")!));
}


for (let i = 0; i < BANK_TYPE.length; i++) {
   const option = document.createElement("option");
   option.value = BANK_TYPE[i];
   option.text = BANK_TYPE[i];
   cardBankName.appendChild(option);
}

for (let i = 0; i < CARDTYPE.length; i++) {
   const option = document.createElement("option");
   option.value = CARDTYPE[i];
   option.text = CARDTYPE[i];
   cardType.appendChild(option);
}

function createPlaceholder(el: any, text1: string, text2: string) {
   el.setAttribute("placeholder", text1);
   setTimeout(() => {
      el.setAttribute("placeholder", text2)
   }, 1600);
   el.value = "";
}

cardForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const { value: numberValue } = cardNumber;
   const { value: expiryValue } = cardExpiry;
   const { value: balanceValue } = cardBalance;

   const numberValueAsInt = parseInt(numberValue);
   const expiryValueAsInt = parseInt(expiryValue);
   if (isNaN(numberValueAsInt)) {
      createPlaceholder(cardNumber, "Enter your card number", "0000 0000 0000 0000");
   } else if (isNaN(expiryValueAsInt)) {
      createPlaceholder(cardExpiry, "Enter number", "00/00");
   }

   let getCurrentUser = JSON.parse(localStorage.getItem("currentUser")!);
   let cardTypeValue = cardType.value as CARD_TYPE;
   if (!numberValue || !expiryValue || !balanceValue || (cardBankName && cardBankName.selectedIndex == 0) || (cardType && cardType.selectedIndex == 0)) {
      alertFunction("Please enter all information", false);
   } else {
      console.log("currentUser", getCurrentUser);

      mainService.registerCard(new Card(numberValue, expiryValue, cardTypeValue, parseInt(balanceValue), 2, cardBankName.value));
      console.log(mainService.getCardList());
      cabinate();
      console.log("Card number: " + numberValue);
      console.log("Expiry number: " + expiryValue);
      console.log("Bank name " + cardBankName.value);
      console.log("Card type " + cardType.value);
      cardNumber.value = "";
      cardExpiry.value = "";
      cardBalance.value = "";
      cardBankName.selectedIndex = 1;
      cardType.selectedIndex = 1;
   }
});



cardExpiry.addEventListener('input', (event: any) => {
   let value = event.target.value;
   if (value.endsWith('/')) {
      value = value.slice(0, -1);
   }
   if (value.length === 2) {
      value += '/';
   } else if (value.length > 5) {
      value = value.slice(0, 5);
   }
   event.target.value = value;
});
cardNumber.addEventListener('input', (event: any) => {
   let value = event.target.value;
   if (value.endsWith(' ')) {
      value = value.slice(0, -1);
   }
   if (value.length === 4) {
      value += ' ';
   }
   else if (value.length === 9) {
      value += ' ';
   }
   else if (value.length === 14) {
      value += ' ';
   }
   else if (value.length > 19) {
      value = value.slice(0, 19);
   }
   if (value.startsWith('86')) cardType.value = 'UZCARD';
   else if (value.startsWith('98')) cardType.value = 'HUMO';
   else cardType.value = 'VISA';
   event.target.value = value;
});



switchRegisterFormBtn.addEventListener('click', () => switchForm(loginForm, registerForm));
switchLoginFormBtn.addEventListener('click', () => switchForm(registerForm, loginForm));

logoutBtn.addEventListener('click', () => {
   localStorage.setItem("cabinate", JSON.stringify(false));
   switchPage(JSON.parse(localStorage.getItem("cabinate")!));
   localStorage.setItem("currentUser", "");
})

const mainService = new MainService();

// const user1 = new User("Nurullo", "Karimov", "+998905640618", "root123");
// const user2 = new User("Amirxon", "Abralov", "+99890444222", "12221ss");

// mainService.register(user1, user2);

// const card1 = new Card("8600000100020003", "12/25", "HUMO", 10000, user1.getId(), "TBC Bank");
// const card2 = new Card("8600000100020004", "12/25", "HUMO", 20000, user1.getId(), "NBU Bank");
// const card3 = new Card("8600000100020005", "12/25", "HUMO", 10000, user1.getId(), "TBC Bank");

// mainService.registerCard(card1, card2, card3);
registerForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const firstNameValue = registerFirsname.value.trim();
   const lastNameValue = registerLastname.value.trim();
   const numberValue = registerNumber.value.trim();
   const passwordValue = registerPassword.value.trim();


   if (!firstNameValue || !lastNameValue || !numberValue || !passwordValue) {
      alertFunction("Please enter all information", false);
   } else {
      mainService.register(new User(firstNameValue, lastNameValue, parseInt(numberValue), passwordValue));
      let currentUser = mainService.getUserByNumber(parseInt(numberValue));
      if (currentUser) {
         isCabinate(true);
         alertFunction("You have registered", true);
         // let usersArray: User[] = JSON.parse(localStorage.getItem("users") || "[]");
         // usersArray.push(currentUser);
         // localStorage.setItem("users", JSON.stringify(usersArray));
         localStorage.setItem("currentUser", JSON.stringify(currentUser));
         cabinate();
         registerFirsname.value = '';
         registerLastname.value = '';
         registerNumber.value = '';
         registerPassword.value = '';
      }
   }
});



loginForm.addEventListener("submit", (e) => {
   e.preventDefault();
   const { value: numberValue } = loginNumber;
   const { value: passwordValue } = loginPassword;
   let currentUser = mainService.login(parseInt(numberValue), passwordValue);
   if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      switchPage(true);
      cabinate();
   }
});

function cabinate() {

   try {
      let getCurrentUser = JSON.parse(localStorage.getItem("currentUser")!);
      userFirstname.textContent = getCurrentUser.firstName;
      userLastname.textContent = getCurrentUser.lastName;
      userNumber.textContent = getCurrentUser.phoneNumber;
      userPassword.textContent = getCurrentUser.password;
      let card = mainService.getCardByUserId(getCurrentUser.getId()!);
      userCard.textContent = card.number;
      console.log("Users list: ", JSON.parse(localStorage.getItem("users")!));
   } catch (error: any) {
      console.log(error.message);
   }
}
window.addEventListener('DOMContentLoaded', () => {
   switchPage(JSON.parse(localStorage.getItem("cabinate")!));
   cabinate();
})


// console.log("Last name: ", signLastname.value);
// console.log("Last name: ", signLastname.value);
// console.log("Phone number: ", signNumber.value);
// console.log("Password: ", signPassword.value);