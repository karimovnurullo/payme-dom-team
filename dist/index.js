import { Card } from "./entities/card/card.js";
import { User } from "./entities/user/user.js";
import { MainService } from "./services/main-service.js";
import { alertFunction } from "./alert.js";
import { BANK_TYPE, CARDTYPE } from "./entities/type/type.js";
const container = document.querySelector('.container');
const loginPage = document.querySelector('.login-page');
const cabinetPage = document.querySelector('.cabinet');
const switchLoginFormBtn = document.querySelector('.login-btn');
const switchRegisterFormBtn = document.querySelector('.create-btn');
const userFirstname = document.querySelector('.user-firstname');
const userLastname = document.querySelector('.user-lastname');
const userNumber = document.querySelector('.user-number');
const userPassword = document.querySelector('.user-password');
const userCard = document.querySelector('.user-card');
const modes = document.querySelectorAll('.mode');
const modeIcon = document.querySelectorAll('.mode-icon');
const logoutBtn = document.querySelector('.logout-btn');
const forms = document.querySelectorAll('.form');
const inputs = document.querySelectorAll('.form input[type="text"], .form input[type="password"]');
const loginForm = document.querySelector('.login-form');
const loginNumber = document.querySelector('.login-number');
const loginPassword = document.querySelector('.login-password');
const registerForm = document.querySelector('.sign-form');
const registerFirsname = document.querySelector('.sign-firsname');
const registerLastname = document.querySelector('.sign-lastname');
const registerNumber = document.querySelector('.sign-number');
const registerPassword = document.querySelector('.sign-password');
// ============================== Card Form Start =============================
const cardForm = document.querySelector('.card-form');
const cardNumber = document.querySelector('.card-number');
const cardExpiry = document.querySelector('.card-date');
const cardBalance = document.querySelector('.card-balance');
const cardBankName = document.querySelector('.card-bankname');
const cardType = document.querySelector('.card-type');
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
            }
            else {
                localStorage.removeItem('mode');
            }
        });
    });
}());
function switchForm(hide, show) {
    hide.classList.add('hide');
    show.classList.remove('hide');
}
function switchPage(active) {
    localStorage.setItem("cabinate", JSON.stringify(active));
    let getCabinate = JSON.parse(localStorage.getItem("cabinate"));
    if (getCabinate) {
        loginPage.classList.add("hide");
        cabinetPage.classList.remove("hide");
    }
    else {
        cabinetPage.classList.add("hide");
        loginPage.classList.remove("hide");
    }
}
function isCabinate(active) {
    localStorage.setItem("cabinate", JSON.stringify(active));
    switchPage(JSON.parse(localStorage.getItem("cabinate")));
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
function createPlaceholder(el, text1, text2) {
    el.setAttribute("placeholder", text1);
    setTimeout(() => {
        el.setAttribute("placeholder", text2);
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
    }
    else if (isNaN(expiryValueAsInt)) {
        createPlaceholder(cardExpiry, "Enter number", "00/00");
    }
    let cardTypeValue = cardType.value;
    if (!numberValue || !expiryValue || !balanceValue || (cardBankName && cardBankName.selectedIndex == 0) || (cardType && cardType.selectedIndex == 0)) {
        alertFunction("Please enter all information", false);
    }
    else {
        let getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = Object.setPrototypeOf(getCurrentUser, User.prototype);
        console.log("currentUser", user);
        mainService.registerCard(new Card(numberValue, expiryValue, cardTypeValue, parseInt(balanceValue), user.getId(), cardBankName.value));
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
cardExpiry.addEventListener('input', (event) => {
    let value = event.target.value;
    if (value.endsWith('/')) {
        value = value.slice(0, -1);
    }
    if (value.length === 2) {
        value += '/';
    }
    else if (value.length > 5) {
        value = value.slice(0, 5);
    }
    event.target.value = value;
});
cardNumber.addEventListener('input', (event) => {
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
    if (value.startsWith('86'))
        cardType.value = 'UZCARD';
    else if (value.startsWith('98'))
        cardType.value = 'HUMO';
    else
        cardType.value = 'VISA';
    event.target.value = value;
});
switchRegisterFormBtn.addEventListener('click', () => switchForm(loginForm, registerForm));
switchLoginFormBtn.addEventListener('click', () => switchForm(registerForm, loginForm));
logoutBtn.addEventListener('click', () => {
    localStorage.setItem("cabinate", JSON.stringify(false));
    switchPage(JSON.parse(localStorage.getItem("cabinate")));
    localStorage.setItem("currentUser", "");
});
const mainService = new MainService();
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstNameValue = registerFirsname.value.trim();
    const lastNameValue = registerLastname.value.trim();
    const numberValue = registerNumber.value.trim();
    const passwordValue = registerPassword.value.trim();
    if (!firstNameValue || !lastNameValue || !numberValue || !passwordValue) {
        alertFunction("Please enter all information", false);
    }
    else {
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
        cabinate();
        switchPage(true);
    }
});
function cabinate() {
    try {
        let getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
        let user = Object.setPrototypeOf(getCurrentUser, User.prototype);
        userFirstname.textContent = user.firstName;
        userLastname.textContent = user.lastName;
        userNumber.textContent = user.phoneNumber.toString();
        userPassword.textContent = user.password;
        let userCardsList = JSON.parse(localStorage.getItem('userCardsList'));
        userCardsList = mainService.getCardByUserId(user.getId());
        localStorage.setItem("userCardsList", JSON.stringify(userCardsList));
        let showCardsBtn = document.querySelector('.show-cards');
        if (userCardsList) {
            userCardsList.map(card => {
                userCard.innerHTML +=
                    `<div class="${card.type === "HUMO" ? "humo" : "uzcard"}">
           <div class="plastik-bank-name">${card.bankName}</div>
           <div class="money"><span class="plastik-money-number">${card.balance}</span><span>uzs</span></div>
           <div class="plastik-card-number">${card.number}</div>
           <div class="plastik-card-date">${card.expiry}</div>
           <div class="user-name"><span class="plastik-first-name">${user.firstName}</span><span class="plastik-last-name">${user.lastName}</span></div>
           <div class="plastik-card-type">${card.type}</div>
       </div>`;
            });
        }
        // showCardsBtn.addEventListener('click', () => {
        // });
    }
    catch (error) {
        console.error(error.message);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    switchPage(JSON.parse(localStorage.getItem("cabinate")));
    cabinate();
});
