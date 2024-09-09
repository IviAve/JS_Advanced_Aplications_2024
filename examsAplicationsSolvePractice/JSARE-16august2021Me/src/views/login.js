import {html, render} from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import {page} from '../lib.js';
import * as userService from "../apies/user.js";

const templ = (handler) => html`
 <!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="auth">
    <form @submit=${handler} id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="#">here</a></span>
            </p>
        </div>
    </form>
</section>

`;

export function loginView(){
    render(templ(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, form){
    if (!data.email || !data.password ) {
        return alert("All fields are req") // maybe must change alert text
    }

    await userService.login(data.email, data.password);
    updateNav();
    page.redirect("/");

}