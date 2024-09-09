import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard page -->
 <section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
      <!-- Display a li with information about every post (if any)-->
      
      ${items.map(item => itemTemplate(item))}

  </section>
  ${items.length === 0 ? html `<h2>There are no items added yet.</h2>` : ""}

`;


const itemTemplate = (item) => html`

<li class="card">
        <img src=${item.imageUrl} alt="travis" />
        <p>
          <strong>Brand: </strong><span class="brand">${item.brand}</span>
        </p>
        <p>
          <strong>Model: </strong
          ><span class="model">${item.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
      </li>
`;
export async function dashboardView(){
  const items = await  getAllItems()
  render(templ(items))
}