const homeSection = document.querySelector('div[data-section="home"]'); // взимаме референция към homeSection
const main = document.querySelector('main'); // взимаме референция към main

const aRef = document.querySelector('a[data-tag]'); // взимаме референция към aRef
aRef.addEventListener('click', onNavigate); // добавяме й eventListener на click - onNavigate

let ctx = null;

export function showHomeView(context) {
    ctx = context;
    main.replaceChildren(homeSection) // подаваме на main да replace-не всичко, което има в него с homeSection
}

function onNavigate(e) { // правим си отделна функция, която ще навигира при натискането на aRef
    e.preventDefault();
    const href = e.target.href; // взимаме локацията при натискането на event target-а
    const pathname = new URL(href).pathname // правим линк към тази локация и й взимаме pathname-а "/dashboard".
    ctx.goTo(pathname) // от context обекта, взимаме функцията goTo и й подаваме параметър pathname "/dashboard".
}