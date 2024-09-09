import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`

 <!-- Dashboard Page ( for Guests and Users ) -->
 <section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    <ul class="other-books-list">
    ${items.map(item => itemTemplate(item))}
    </ul>
    <!-- Display paragraph: If there are no books in the database -->
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
export async function dashboardView(){
  const posts = await  getAllItems()
  render(templ(posts))
}

