import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
<!-- Dashboard page -->
<h2>Characters</h2>
  <section id="characters">
    <!-- Display a div with information about every post (if any)-->
   ${items.map(item => itemTemplate(item))}
  </section>
   <!-- Display an h2 if there are no posts -->
   
  <!-- Display an h2 if there are no posts -->
  ${items.length === 0 ? html `<h2>No added Heroes yet.</h2>` : ""}

`;


const itemTemplate = (item) => html`

<div class="character">
      <img src=${item.imageUrl} alt="example1" />
      <div class="hero-info">
        <h3 class="category">${item.category}</h3>
        <p class="description">${item.description}</p>
        <a class="details-btn" href="/details/${item._id}">More Info</a>
      </div>
`;
export async function dashboardView(){
  const cars = await  getAllItems()
  render(templ(cars))
}