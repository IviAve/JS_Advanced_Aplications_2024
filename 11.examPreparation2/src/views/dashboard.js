import { html, render} from "../lib.js";
import { getAllCars } from "../apies/methodsForItems.js";


const templ = (items) => html`
<!-- Dashboard page -->
<h3 class="heading">Our Cars</h3>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${items.map(item => itemTemplate(item))}
  </section>
  <!-- Display an h2 if there are no posts -->
  ${items.length === 0 ? html `<h3 class="nothing">Nothing to see yet</h3>` : ""}

`;


const itemTemplate = (item) => html`

<div class="car">
      <img src=${item.imageUrl} alt="example1" />
      <h3 class="model">${item.model}</h3>
      <div class="specs">
        <p class="price">Price: €${item.price}</p>
        <p class="weight">Weight: ${item.weight} kg</p>
        <p class="top-speed">Top Speed: ${item.speed} kph</p>
      </div>
      <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
`;
export async function dashboardView(){
  const cars = await  getAllCars()
  render(templ(cars))
}