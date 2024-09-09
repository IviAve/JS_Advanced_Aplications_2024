import {html, render} from "../lib.js"

const templ = () => html`
<!-- Home page -->

`;

export function showHome(){
    render(templ());
}