import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`

<!-- Catalogue -->
<section id="catalog-page">
    <h1>All Games</h1>
    <!-- Display div: with information about every game (if any) -->
    
   ${items.map(item => itemTemplate(item))}
  
   
  ${items.length === 0 ? html `<h3 class="no-articles">No articles yet</h3>` : ""}
  </section>
`;


const itemTemplate = (item) => html`

<div class="allGames">
        <div class="allGames-info">
            <img src=${item.imageUrl}>
            <h6>${item.category}</h6>
            <h2>${item.title}</h2>
            <a href="details/${item._id}" class="details-button">Details</a>
        </div>

    </div>
`;
export async function dashboardView(){
  const games = await  getAllItems()
  render(templ(games))
}