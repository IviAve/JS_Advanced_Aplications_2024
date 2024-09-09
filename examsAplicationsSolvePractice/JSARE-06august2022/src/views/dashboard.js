import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard page -->
 <section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
    ${items.map(item => itemTemplate(item))}
   
  </section>

    <!-- Display an h2 if there are no posts -->
    ${items.length === 0 ? html `<h2>No offers yet.</h2>` : ""}
    

`;


const itemTemplate = (item) => html`

<div class="offer">
      <img src=${item.imageUrl} alt="example1" />
      <p>
        <strong>Title: </strong><span class="title">${item.title}</span>
      </p>
      <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
      <a class="details-btn" href="/details/${item._id}">Details</a>
    </div>
`;
export async function dashboardView(){
  const allItems = await  getAllItems()
  render(templ(allItems))
}