import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard page -->
 <section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
      <!-- Display a li with information about every post (if any)-->
    ${items.map(item => itemTemplate(item))}
    
  </section>
   
  ${items.length === 0 ? html `<h2>There are no albums added yet.</h2>` : ""}

`;


const itemTemplate = (item) => html`

<li class="card">
        <img src=${item.imageUrl} alt="travis" />
        <p>
          <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
        </p>
        <p>
          <strong>Album name: </strong><span class="album">${item.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
      </li>
`;
export async function dashboardView(){
  const albums = await  getAllItems()
  render(templ(albums))
}

