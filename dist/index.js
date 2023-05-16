import { Card } from "./entities/card/card.js";
import { User } from "./entities/user/user.js";
import { MainService } from "./services/main-service.js";
// function init() {
const container = document.querySelector('.container');
const enterPage = document.querySelector('.enter-page');
const cabinetPage = document.querySelector('.cabinet');
const loginBtn = document.querySelector('.login-btn');
const createBtn = document.querySelector('.create-btn');
const userFirstname = document.querySelector('.user-firstname');
const userLastname = document.querySelector('.user-lastname');
const modes = document.querySelectorAll('.mode');
const modeIcon = document.querySelectorAll('.mode-icon');
const logoutBtn = document.querySelector('.logout-btn');
const forms = document.querySelectorAll('.form');
const inputs = document.querySelectorAll('.form input[type="text"], .form input[type="password"]');
let currentIndex = 0;
let currentPage = "false";
let currenetUser;
// loginForm elements
const loginForm = document.querySelector('.login-form');
const loginNumber = document.querySelector('.login-number');
const loginPassword = document.querySelector('.login-password');
// loginForm elements
// loginForm elements
const signForm = document.querySelector('.sign-form');
const signFirsname = document.querySelector('.sign-firsname');
const signLastname = document.querySelector('.sign-lastname');
const signNumber = document.querySelector('.sign-number');
const signPassword = document.querySelector('.sign-password');
// loginForm elements
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
loginBtn.addEventListener('click', () => {
    signForm.style.display = "none";
    loginForm.style.display = "flex";
    console.log("Clicked on login");
});
createBtn.addEventListener('click', () => {
    loginForm.style.display = "none";
    signForm.style.display = "flex";
});
try {
    const mainService = new MainService();
    const user1 = new User("Nurullo", "Karimov", "+998905640618", "root123");
    const user2 = new User("Amirxon", "Abralov", "+99890444222", "12221ss");
    mainService.register(user1, user2);
    const card1 = new Card("8600000100020003", "12/25", "HUMO", 10000, user1.getId(), "TBC Bank");
    const card2 = new Card("8600000100020004", "12/25", "HUMO", 20000, user2.getId(), "NBU Bank");
    const card3 = new Card("8600000100020005", "12/25", "HUMO", 10000, user1.getId(), "TBC Bank");
    function cabinateFunction(currentPage) {
        if (currentPage === "true") {
            cabinetPage.style.display = 'flex';
            enterPage.style.display = 'none';
        }
        else {
            enterPage.style.display = 'flex';
            cabinetPage.style.display = 'none';
        }
    }
    const signBtn = document.querySelector('.sign-btn');
    signBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let newUser = new User(signFirsname.value, signLastname.value, signNumber.value, signPassword.value);
        mainService.register(newUser);
        currenetUser = mainService.login(signNumber.value.toString(), signPassword.value.toString());
        console.log("Added new user");
        localStorage.setItem("currentUser", JSON.stringify(currenetUser));
        let getCurrentUser = JSON.parse(localStorage.getItem("currentUser") || "");
        console.log(getCurrentUser);
        currentPage = "true";
        localStorage.setItem('currentPage', currentPage);
        let getCurrentPage = localStorage.getItem('currentPage');
        cabinateFunction(getCurrentPage);
    });
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const successLogin = mainService.login(loginNumber.value, loginPassword.value);
        console.log("Succes", successLogin);
        if (successLogin) {
            enterPage.style.display = 'none';
            cabinetPage.style.display = 'flex';
            currentPage = "true";
            localStorage.setItem('currentPage', currentPage);
            localStorage.setItem("currenetUser", JSON.stringify(successLogin));
        }
    });
    logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", () => {
        currentPage = "false";
        localStorage.setItem("currentPage", currentPage.toString());
        let getCurrentPage = localStorage.getItem('currentPage');
        cabinateFunction(getCurrentPage);
    });
    window.addEventListener("DOMContentLoaded", () => {
        let getCurrentPage = localStorage.getItem('currentPage');
        cabinateFunction(getCurrentPage);
    });
    let getCurrentUser = localStorage.getItem('currentUser');
    if (getCurrentUser !== null) {
        let parsedUser = JSON.parse(getCurrentUser);
        userFirstname.textContent = parsedUser.firstName;
        userLastname.textContent = parsedUser.lastName;
        console.log(parsedUser.firstName, parsedUser.lastName);
    }
}
catch (err) {
    console.error(err.message);
}
// try {
//    mainService.registerCard(card1, card2, card3);
//    mainService.transaction("8600000100020003", "8600000100020005", 10000);
//    mainService.transaction("8600000100020005", "8600000100020003", 100);
//    mainService.transaction("8600000100020004", "8600000100020003", 5000);
//    console.log("Cards", mainService.getCardList());
//    console.log("History: ", mainService.getTransactionHistory());
// } catch (error) {
//    // console.error(error.message);
// }
