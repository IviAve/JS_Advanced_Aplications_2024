import {html, render} from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import {page} from '../lib.js';
import * as userService from "../apies/user.js";

const templ = (handler) => html`
  <!-- Login Page (Only for Guest users) -->
<section id="login-page" class="auth">
    <form @submit=${handler} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>

`;

export function loginView(){
    render(templ(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, form){
    if (!data.email || !data.password ) {
        return alert("All fields are required") // maybe must change alert text
    }

    await userService.login(data.email, data.password);
    updateNav();
    page.redirect("/");

}