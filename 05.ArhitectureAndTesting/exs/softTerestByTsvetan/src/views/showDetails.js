import {html} from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../service/dataService.js';
import { goTo } from '../utility/goTo.js';
import { renderer } from '../utility/render.js';
import { userUtil } from '../utility/userUtil.js';

const temp = (item, isOwner) => html`
    <div class="container home some">
        <img class="det-img" src=${item.img} />
        <div class="desc">
            <h2 class="display-5">${item.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${item.description}</p>
        </div>
        <div class="text-center">
            ${isOwner? html`<a @click=${onDelete} class="btn detb" href="">Delete</a>` : ''}
        </div>
    </div>
`;

let id = null;
let isOwner = false;
export async function showDetailsView(ctx) {
    id = ctx.params.id;
    const userData = userUtil.getUserData();
    const item =  await dataService.getDetails(id);
    if (userData) {
        isOwner = userUtil.hasOwner(item._ownerId);
    } else {
        isOwner = false;
    }

    renderer(temp(item, isOwner));
}

async function onDelete(e) {
    e.preventDefault();

    await dataService.delIdea(id);
    goTo('/dashboard');
}