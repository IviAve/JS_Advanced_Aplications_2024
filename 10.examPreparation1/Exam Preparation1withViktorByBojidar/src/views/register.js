import { register } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const registerTemp = (onRegister) => html`
<section id="register">
          <div class="form">
            <img class="border" src="/images/border.png" alt="">
            <h2>Register</h2>
            <form @submit=${onRegister} class="register-form">
              <input type="text" name="email" id="register-email" placeholder="email"/>
              <input type="password" name="password" id="register-password" placeholder="password"/>
              <input type="password" name="re-password" id="repeat-password" placeholder="repeat password"/>
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
            <img class="border" src="/images/border.png" alt="">
          </div>
        </section>`

export function registerView() {
    render(registerTemp(createSubmitHandler(onRegister)));

}

async function onRegister({ email, password, 're-password': repass }) {
    if (!email || !password  || password !== 're-password') {
        return alert('All fields are required!')
    }

    if (!repass !== password) {
        return alert ('Passwords don\'t match!')
    }

    await register(email, password);
    updateNav();
    page.redirect('/');
}