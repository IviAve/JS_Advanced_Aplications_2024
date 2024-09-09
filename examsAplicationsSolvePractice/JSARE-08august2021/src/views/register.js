import { html, render } from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import * as userService from "../apies/user.js";
import { page } from '../lib.js'

const templ = (handler) => html`
<!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="register">
    <form @submit=${handler} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export function registerView() {
  render(templ(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, formRef) {
  if (!data.email || !data.password || data.password !== data["confirm-pass"]) {  // must to change [re-password] when is different
    return alert("All fields are required") // maybe must change alert text
  }

  await userService.register(data.email, data.password);
  updateNav();
  page.redirect("/dashboard");

}


// async function onSubmit(data, formRef) {
//   if (!data.email || !data.password ) {
//     return alert("All fields are required") // maybe must change alert text
//   }

//   if (data.password !== data["re-password"]) {
//     return alert("Password dont match")
//   }

//   await userService.register(data.email, data.password);
//   updateNav();
//   page.redirect("/");

// }

