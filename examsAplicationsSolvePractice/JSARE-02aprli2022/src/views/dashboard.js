import { html, render } from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
<!--Dashboard-->
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        
${items.map(item => itemTemplate(item))}
  

 
  ${items.length === 0 ? html`<div>
            <p class="no-pets">No pets in dashboard</p>
        </div>` : ""}
        </div>
  </section>
`;


const itemTemplate = (item) => html`

<div class="animals-board">
            <article class="service-img">
                <img class="animal-image-cover" src=${item.image}>
            </article>
            <h2 class="name">${item.name}</h2>
            <h3 class="breed">${item.breed}</h3>
            <div class="action">
                <a class="btn" href="/details/${item._id}">Details</a>
            </div>
        </div>

`;
export async function dashboardView() {
  const posts = await getAllItems()
  render(templ(posts))
}

