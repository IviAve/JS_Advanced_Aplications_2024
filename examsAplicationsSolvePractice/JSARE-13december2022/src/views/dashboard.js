import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard page -->
 <h2>Products</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    
    ${items.map(item => itemTemplate(item))}
  </section>
  <!-- Display an h2 if there are no posts -->
  
  ${items.length === 0 ? html `<h2>No products yet.</h2>` : ""}

`;


const itemTemplate = (item) => html`

<div class="product">
      <img src=${item.imageUrl} alt="example1" />
      <p class="title">${item.name}</p>
      <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
      <a class="details-btn" href="/details/${item._id}">Details</a>
    </div>
`;
export async function dashboardView(){
  const facts = await  getAllItems()
  render(templ(facts))
}

