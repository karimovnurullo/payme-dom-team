import { Card } from "./entities/card/card.js";
import { User } from "./entities/user/user.js";
import { MainService } from "./services/main-service.js";
import { alertFunction } from "./alert.js";

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
      userCard.textContent = mainService.getCardByUserId(getCurrentUser.getId()).join(", ");
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