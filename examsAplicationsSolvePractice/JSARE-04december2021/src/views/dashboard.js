import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";
import { getUserData } from "../utils.js";


const templ = (items) => html`
<!--Catalog-->
<section id="catalogPage">
    <h1>All Albums</h1>
    <!-- Display a div with information about every post (if any)-->
   ${items.map(item => itemTemplate(item))}
  
</section>
  ${items.length === 0 ? html `<p>No Albums in Catalog!</p>` : ""}

`;


const itemTemplate = (item,hasUser) => html`

<div class="card-box">
        <img src=${item.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${item.name}</p>
                <p class="artist">Artist: ${item.artist}</p>
                <p class="genre">Genre: ${item.genre}</p>
                <p class="price">Price: $${item.price}</p>
                <p class="date">Release Date: ${item.releaseDate}</p>
            </div>
            <div class="btn-group">
            ${hasUser ? html`
            
                <a href="/details/${item._id}"  id="details">Details</a>
            </div>
               ` : ""
            } 
           
        </div>
    </div>
`;
export async function dashboardView(){
  const items = await  getAllItems()
  const userData = getUserData()
  debugger
  const hasUser = Boolean(userData);
  
  render(templ(items,hasUser))
}