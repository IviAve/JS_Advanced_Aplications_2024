import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard page -->
 <h3 class="heading">Market</h3>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    
    ${items.map(item => itemTemplate(item))}
  </section>
  <!-- Display an h2 if there are no posts -->
  

  ${items.length === 0 ? html `<h3 class="empty">No Items Yet</h3>` : ""}

`;


const itemTemplate = (item) => html`

<div class="item">
      <img src=${item.imageUrl} alt="example1" />
      <h3 class="model">${item.item}</h3>
      <div class="item-info">
        <p class="price">Price: €${item.price}</p>
        <p class="availability">
          ${item.availability}
        </p>
        <p class="type">Type: ${item.type}</p>
      </div>
      <a class="details-btn" href="/details/${item._id}">Uncover More</a>
    </div>
`;
export async function dashboardView(){
  const items = await  getAllItems()
  render(templ(items))
}