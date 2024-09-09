import {html, render} from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import {page} from '../lib.js';
import * as userService from "../apies/user.js";

const templ = (handler) => html`
  <!-- Login Page (Only for Guest users) -->
<!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="login">
    <form @submit=${handler} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
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
    page.redirect("/dashboard");

}