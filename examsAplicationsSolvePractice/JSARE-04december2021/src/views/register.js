import { html, render } from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import * as userService from "../apies/user.js";
import { page } from '../lib.js'

const templ = (handler) => html`
 <!--Registration-->
<section id="registerPage">
    <form @submit=${handler}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
`;

export function registerView() {
  render(templ(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, formRef) {
  if (!data.email || !data.password ) {
    return alert("All fields are required") // maybe must change alert text
  }
  if ( data.password !== data["conf-pass"]) {
    return alert("Password dont match")
  }

  await userService.register(data.email, data.password);
  updateNav();
  page.redirect("/");

}