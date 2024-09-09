import { login } from "../data/user.js";
import { html, page, render } from "../lib.js";
import { createSubmitHandler, updateNav } from "../utils.js";

const loginTemplate = (onLogin) => html`
<section id="login">
          <div class="form">
            <img class="border" src="/images/border.png" alt="">
            <h2>Login</h2>
            <form @submit=${onLogin} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
            <img class="border" src="/images/border.png" alt="">
          </div>
        </section>`

export function loginView() {
    render(loginTemplate(createSubmitHandler(onLogin)));
}

async function onLogin({ email, password }) {
    if (!email || !password) {
        return alert('All fields are required!');
    }

    await login(email, password);
    updateNav();
    page.redirect('/');
}