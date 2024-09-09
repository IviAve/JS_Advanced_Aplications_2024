import {html, render} from "../lib.js"

const templ = () => html`
<!-- Home page -->
<section id="home">
    <img src="./images/beauty-g0d19af267_1920-removebg.png" alt="home" />
    <h2>Looking for the best beauty products?</h2>
    <h3>You are in the right place!</h3>
  </section>
`;

export function showHome(){
    render(templ());
}