import { html, render } from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import * as userService from "../apies/user.js";
import { page } from '../lib.js'

const templ = (handler) => html`
 <!--Register Page-->
<section id="registerPage">
    <form @submit=${handler} class="registerForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="#">here</a></span>
        </p>
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

