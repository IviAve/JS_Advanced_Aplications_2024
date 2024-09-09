import {html, render} from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import {page} from '../lib.js';
import * as userService from "../apies/user.js";

const templ = (handler) => html`
<!--Login-->
<section id="loginPage">
    <form @submit=${handler}>  
    <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="#">here</a></span>
            </p>
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
    page.redirect("/");

}