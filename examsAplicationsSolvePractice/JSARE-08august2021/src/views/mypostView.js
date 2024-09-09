import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData } from "../utils.js";


const templ = (items) => html`

<!-- My Books Page ( Only for logged-in users ) -->
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    <ul class="my-books-list">
    ${items.map(item => itemTemplate(item))}
    </ul>
  ${items.length === 0 ? html `<p class="no-books">No books in database!</p>` : ""}
    </section>
`;

const itemTemplate = (item) => html`
<li class="otherBooks">
            <h3>${item.title}</h3>
            <p>Type: ${item.type}</p>
            <p class="img"><img src=${item.imageUrl}></p>
            <a class="button" href="/details/${item._id}">Details</a>
        </li>
`;

export async function showMyPostView() {
    const userData = getUserData();
    const userId = userData._id;

    const posts = await apiService.getMyPost(userId);

    render(templ(posts));
}