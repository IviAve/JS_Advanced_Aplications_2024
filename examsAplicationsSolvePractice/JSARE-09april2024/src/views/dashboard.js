import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard page -->
 <h2>Solutions</h2>
      <section id="solutions">
        <!-- Display a div with information about every post (if any)-->
        
        ${items.map(item => itemTemplate(item))}
      </section>
      <!-- Display an h2 if there are no posts -->
     
  ${items.length === 0 ? html `<h2 id="no-solution">No Solutions Added.</h2>` : ""}

`;


const itemTemplate = (item) => html`

<div class="solution">
          <img src=${item.imageUrl} alt="example1" />
          <div class="solution-info">
            <h3 class="type">${item.type}</h3>
            <p class="description">
              ${item.description}
            </p>
            <a class="details-btn" href="/details/${item._id}">Learn More</a>
          </div>
        </div>
`;
export async function dashboardView(){
  const items = await  getAllItems()
  render(templ(items))
}