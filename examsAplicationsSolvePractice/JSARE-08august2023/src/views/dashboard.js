import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard page -->
 <h2>Available Motorcycles</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${items.map(item => itemTemplate(item))}
    
  </section>
   
  <!-- Display an h2 if there are no posts -->
  ${items.length === 0 ? html `<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>` : ""}

`;


const itemTemplate = (item) => html`

<div class="motorcycle">
      <img src=${item.imageUrl} alt="example1" />
      <h3 class="model">${item.model}</h3>
      <p class="year">Year: ${item.year}</p>
      <p class="mileage">Mileage: ${item.mileage} km.</p>
      <p class="contact">Contact Number: ${item.contact}</p>
    
      <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
`;
export async function dashboardView(){
  const motorcycle = await  getAllItems()
  render(templ(motorcycle))
}