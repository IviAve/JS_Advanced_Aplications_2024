import { userUtil } from "./userUtil.js";

const createNav = document.querySelectorAll('li.nav-item')[1];
const logoutNav = document.querySelectorAll('li.nav-item')[2];
const loginNav = document.querySelectorAll('li.nav-item')[3];
const registerNav = document.querySelectorAll('li.nav-item')[4];

export function updateNav() {
    const user = userUtil.getUserData();

    if (user) {
        createNav.style.display = 'inline-block';
        loginNav.style.display = 'none';
        registerNav.style.display = 'none';
        logoutNav.style.display = 'inline-block';
    } else {
        createNav.style.display = 'none';
        loginNav.style.display = 'inline-block';
        registerNav.style.display = 'inline-block';
        logoutNav.style.display = 'none';
    }
}