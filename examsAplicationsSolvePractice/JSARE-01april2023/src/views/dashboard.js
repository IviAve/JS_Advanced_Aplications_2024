import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard page -->
 <h2>Fruits</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
   ${items.map(item => itemTemplate(item))}
  
</section>
  ${items.length === 0 ? html `<h2>No fruit info yet.</h2>` : ""}

`;


const itemTemplate = (item) => html`

<div class="fruit">
      <img src=${item.imageUrl} alt="example1" />
      <h3 class="title">${item.name}</h3>
      <p class="description">${item.description}</p>
      <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
`;
export async function dashboardView(){
  const items = await  getAllItems()
  render(templ(items))
}