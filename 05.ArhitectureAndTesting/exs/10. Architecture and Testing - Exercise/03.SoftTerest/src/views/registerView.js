import { userService } from "../api/userService.js";

const main = document.querySelector('main'); // взимаме референция към main елемента
const section = document.querySelector('div[data-section="register"]'); // взимаме register section-а

const formRef = section.querySelector('form'); // взимаме формата от register section-а
formRef.addEventListener('submit', onSubmit); // добавяме eventListener на формата

let context = null;
export function showRegisterView(ctx) {
    context = ctx;
    main.replaceChildren(section)
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target) // взимаме си formData-та от target-а на event-а
    const {email, password, repeatPassword} = Object.fromEntries(formData) // взимаме email, password, repeatPassword от formData-та

    if (email.length < 3 || password.length < 3 || repeatPassword !== password) {
        return alert('Oops');
    }

    const userData = await userService.register({email, password}); // изпълняваме функцията register от обекта userService и подаваме параметри email и password
    sessionStorage.setItem('userData', JSON.stringify(userData)); // в sessionStorage запазваме userData-та (email, password)
    
    context.updateNav() // след изпълнението на функцията изпълни updateNav
    context.goTo("/"); // изпълняваме функцията goTo и подаваме параметър "/", това ще ни върне обратно към home menu-то

}
