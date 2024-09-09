import { html, render } from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import * as userService from "../apies/user.js";
import { page } from '../lib.js'

const templ = (handler) => html`
 <!-- Register Page (Only for Guest users) -->
<section id="register-page" class="auth">
    <form @submit=${handler} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>
`;

export function registerView() {
  render(templ(createSubmitHandler(onSubmit)));
}

async function onSubmit(data, formRef) {
  if (!data.email || !data.password || data.password !== data["repeatPassword"]) {  // must to change [re-password] when is different
    return alert("All fields are required") // maybe must change alert text
  }

  await userService.register(data.email, data.password);
  updateNav();
  page.redirect("/");

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

