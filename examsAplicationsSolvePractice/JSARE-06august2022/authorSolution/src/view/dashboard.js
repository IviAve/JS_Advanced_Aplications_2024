import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllOffers } from "../api/data.js";

const dashboardTemplate = (offers) => html`<section id="dashboard">
  <h1>Job Offers</h1>
  ${offers.length == 0
    ? html`<h1>No offers yet.</h1>`
    : offers.map(
        (o) => html`<div class="offer">
          <img src="${o.logo}" alt="example1" />
          <p><strong>Title: </strong><span class="title">${o.title}</span></p>
          <p><strong>Salary:</strong><span class="salary">${o.salary}</span></p>
          <a class="details-btn" href="/details/${o._id}">Details</a>
        </div>`
      )}
</section>`;

export async function dashboardPage(ctx) {
  const offers = await getAllOffers();
  console.log(offers);
  ctx.render(dashboardTemplate(offers));
}
