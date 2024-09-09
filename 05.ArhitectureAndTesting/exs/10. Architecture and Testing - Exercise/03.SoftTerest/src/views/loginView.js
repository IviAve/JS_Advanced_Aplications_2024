import { userService } from "../api/userService.js";

const main = document.querySelector('main'); // взимаме си референция към main-а
const section = document.querySelector('div[data-section="login"]'); // взимаме си референция към login section-а 

const formRef = section.querySelector('form') // взимаме си референция към формата от section
formRef.addEventListener('submit', onSubmit);

let context = null; // щом имаме ротация ще ни трябва context
export function showLoginView(ctx) {
    context = ctx;
    main.replaceChildren(section);
}

// Правим асинхронна функция, която при submit на формата ще изпълнява следното:
async function onSubmit(e) {
    e.preventDefault(); 
    
    const formData = new FormData(e.target); // взима данните от target-a на event-а
    const {email, password} = Object.fromEntries(formData); // взима email и password от данните на формата

    if (!email || !password) {
        return alert('Oops');
    }


    await userService.login({email, password}); // изпълняваме функцията login от обекта userService с параметри email и password
    
    context.updateNav() // след изпълнението на функцията изпълни updateNav
    context.goTo('/'); // след изпълнението на функцията се върни в home menu-то

}