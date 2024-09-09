import {html} from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../service/dataService.js';
import { renderer } from '../utility/render.js';

const temp = (items) => html`
    <div id="dashboard-holder">
        ${items.map(x => cardTemp(x))}
  </div>
`;

const cardTemp = (item) => html`
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem">
        <div class="card-body">
            <p class="card-text">${item.title}</p>
        </div>
        <img class="card-image" src=${item.img} alt="Card image cap" />
        <a class="btn" href="/details/${item._id}">Details</a>
    </div>
`;

const noItemTemp = () => html`<h1>No ideas yet! Be the first one :)</h1>`;

export async function showDashboardView() {
    const items = await dataService.getAllIdeas();

    if (!items) {
        renderer(noItemTemp());
    } else {
        renderer(temp(items));
    }
}

