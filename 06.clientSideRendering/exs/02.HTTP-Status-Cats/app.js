import { cats } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('allCats');

render(createListOfCatTemp(), root);

function createListOfCatTemp() {

    return html`
    <ul>
    ${cats.map((cat, i) => createCatTemp(cat))}
    </ul>
    `

}
function createCatTemp(cat) {
    return html`
            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${toggleStatus}>Show status code</button>
                    <div class="status" style="display: none" id=${cat.id}>
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
    `
}

function toggleStatus (e){
const btn = e.target;
const parent = btn.parentElement;
const div = parent.querySelector('div');
const currentState = div.style.display;

div.style.display = currentState === 'block' ? 'none' : 'block';
btn.textContent = currentState === 'block' ? 'Show status code' : 'Hide status code';


}
