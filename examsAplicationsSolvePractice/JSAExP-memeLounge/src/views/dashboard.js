import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
<!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${items.map(item => itemTemplate(item))}
        
        
        <!-- Display : If there are no memes in database -->
        ${items.length === 0 ? html `<p class="no-memes">No memes in database.</p>` : ""}
    </div>
</section>
 
`;


const itemTemplate = (item) => html`

<div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${item.title}</p>
                    <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
                </div>
                <div id="data-buttons">
                    <a class="button" href="/details/${item._id}">Details</a>
                </div>
            </div>
        </div>
`;
export async function dashboardView(){
  const items = await  getAllItems()
  render(templ(items))
}