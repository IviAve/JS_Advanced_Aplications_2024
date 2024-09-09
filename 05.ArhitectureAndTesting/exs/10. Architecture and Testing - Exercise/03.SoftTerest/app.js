import { userService } from "./src/api/userService.js";
import { userUtils } from "./src/utils/userUtils.js";
import { showCreateView } from "./src/views/createView.js";
import { showDashboardView } from "./src/views/dashboardView.js";
import { showEditView } from "./src/views/editView.js";
import { showHomeView } from "./src/views/homeView.js";
import { showLoginView } from "./src/views/loginView.js";
import { showRegisterView } from "./src/views/registerView.js";

Array.from(document.querySelectorAll('div[data-section]')).forEach(section => section.remove()); // Като за начало премахваме всички секции. Слагаме Array.From(), защото Judge няма да му се изкефи.
const main = document.getElementsByTagName('main'); // тъй направихме main и сложихме всички секции в него, взимаме референция към main.

const nav = document.querySelector('nav'); // взимаме референция към nav
nav.addEventListener('click', onNavigate); // слагаме eventListener на целия nav

const routes = {
    '/': showHomeView,
    '/login': showLoginView,
    '/register': showRegisterView, 
    '/dashboard': showDashboardView,
    '/create': showCreateView,
    '/edit':  showEditView,
    '/logout': onLogout,
}

// Създаваме кратка асинхронна функция, която:
async function onLogout() {
    userService.logout(); // изпълнява logout функцията от обекта userService
    updateNav(); // изпълнява функцията updateNav()
    goTo('/'); // връща на първоначалната страница
}


function onNavigate(e) { // Идеята на onNavigate е да вземе пътя и да го даде на някой
    e.preventDefault(); // prevent-ваме default-ното поведение на ancher-а, защото той се опитва да навигира на някъде (защото е линк)

    let target = e.target; // взимаме target-a

    if (target.tagName !== 'A') { // ако tagName-а на target-а не е ancher, то тогава:
        target = e.target.parentElement // то тогава нашия target (image) е parentElement-а (ancher-a) на самия target (image-a)
    }

    if (!target.href) { // Ако натиснем някъде в полето, то съответно ще цъкнем върху div container-a и няма да цъкнем на href (линк), съответно правим проверка:
        return;
    }

    const currentUrl = new URL(target.href) // създаваме линк, с локацията където се намираме
    const viewName = currentUrl.pathname // от currentUrl взимаме pathname-a, това което седи след "/".
    goTo(viewName); // изпълняваме функцията goTo с viewName, примерно (/edit)
}

// Функция, която на базата на това дали потребителя се е log-нал или не, ще показва/скрива някакви секции.
function updateNav() {
    const hasUser = userUtils.getUser(); // изпълни userUtils.getUser() и ми върни резултата в променливата hasUser
    const userA = document.querySelectorAll('a[data-user]'); // взимаме всички ancher-и от nav-a, които ще са видими за lognat-ия потребител
    const guestA = document.querySelectorAll('a[data-guest]'); // взимаме всички ancher-и от nav-a, които ще са скрити за lognat-ия потребител

    if (hasUser) { // Ако имаме log-нат потребител:
        userA.forEach(ancher => ancher.style.display = 'block'); // направи всеки един ancher за логнати потребители видим
        guestA.forEach(ancher => ancher.style.display = 'none'); // направи всеки един ancher за guest потребители невидим.
    
    } else { // в противен случай (ако нямаме log-нат потребител, имаме guest потребител):
        userA.forEach(ancher => ancher.style.display = 'none'); // направи всеки един ancher за логнати потребители невидим.
        guestA.forEach(ancher => ancher.style.display = 'block'); // направи всеки един ancher за guest потребители видим
    }

}

// Запазваме си функцията в обект
const ctx = { 
    goTo,
    updateNav
}

// По този начин export-ваме функцията goTo като параметър към функцията homeView без да правим circle export.
function goTo(name) { // примерно подаваме viewName - "/""
    const handler = routes[name]; // handler е функцията срещу "/"" в routes
    handler(ctx); // изпълни showHomeView с дадения параметър обектa ctx (goTo)
}

goTo('/') // при първоначално зареждане изпълни функцията showHomeView
updateNav() // при първоначално зареждане изпълни функцията updateNav