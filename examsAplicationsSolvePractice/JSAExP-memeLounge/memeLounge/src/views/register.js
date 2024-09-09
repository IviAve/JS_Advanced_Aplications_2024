import { html, render } from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import * as userService from "../apies/user.js";
import { page } from '../lib.js'

import {notifyView} from "./notification.js"

const templ = (handler) => html`
<!-- Register Page ( Only for guest users ) -->
<section id="register">
    <form @submit=${handler} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="#">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

export function registerView() {
  render(templ(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, formRef) {
  if (!data.username || !data.email || !data.password  ) {
    return notifyView("All fields are required") // maybe must change alert text
  }
  if (data.password !== data["repeatPass"]) {
    return notifyView("Passwords don't match")
  }

  await userService.register(data.username, data.email, data.password, data.gender);
  updateNav();
  page.redirect("/dashboard");

}