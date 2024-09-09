import { html, render } from "../lib.js"
import { createSubmitHandler, updateNav } from "../utils.js";
import * as userService from "../apies/user.js";
import { page } from '../lib.js'

const templ = (handler) => html`
 <!-- Register Page (Only for Guest users) -->
 <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit=${handler}class="register-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
      </form>
    </div>
  </section>
`;

export function registerView() {
  render(templ(createSubmitHandler(onSubmit)));
}

// async function onSubmit(data, formRef) {
//   if (!data.email || !data.password || data.password !== data["re-password"]) {
//     return alert("All fields are required") // maybe must change alert text
//   }

//   await userService.register(data.email, data.password);
//   updateNav();
//   page.redirect("/");

// }


async function onSubmit(data, formRef) {
  if (!data.email || !data.password ) {
    return alert("All fields are required") // maybe must change alert text
  }

  if (data.password !== data["re-password"]) {
    return alert("Password dont match")
  }

  await userService.register(data.email, data.password);
  updateNav();
  page.redirect("/");

}