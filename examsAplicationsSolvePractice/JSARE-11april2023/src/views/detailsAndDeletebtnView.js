import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import { page } from "../lib.js";

import * as goToService from "../apies/goToService.js";

const templ = (item, owner, hasUser, hasGoTo, goTo) => html`
<!-- Details page -->
<section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${item.imageUrl} alt="example1" />
      <p id="details-title">${item.name}</p>
      <p id="details-category">
        Category: <span id="categories">${item.category}</span>
      </p>
      <p id="details-date">
        Date:<span id="date">${item.date}</span></p>
      <div id="info-wrapper">
        <div id="details-description">
          <span
            >${item.description}</span>
        </div>

      </div>

      <h3>Going: <span id="go">${goTo}</span> times.</h3>

          <!--Edit and Delete are only for creator-->
          ${hasUser ? html`
              <div id="action-buttons">
                
                  ${owner ? html`
                  
        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
        <a href="#" @click=${onDelete} data-id =${item._id} id="delete-btn">Delete</a>
                      
                  ` : ''}
                  ${hasGoTo ? null : html`
                      <!--Bonus - Only for logged-in users ( not authors )-->
                      <a href="" @click=${onGoTo} data-id =${item._id} id="go-btn">Going</a>
                      
                      
                  `}
          </div>` : ""}
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;

  const [item, goToInfo] = await Promise.all([
    apiService.getItemById(id),
    goToService.getGoToById(id)
  ]);

  const userData = getUserData();
  //const item = await apiService.getItemById(id);
  const owner = hasOwner(item._ownerId);
  const hasUser = Boolean(userData);
  const hasGoTo = goToInfo.hasGoTo || owner;
  const goTo = goToInfo.goTo;

  render(templ(item, owner, hasUser, hasGoTo, goTo))
}

async function onGoTo(e) {
  e.preventDefault();

  const eventId = e.target.dataset.id;

  await goToService.postGoTo({ eventId });

  page.redirect(`/details/${eventId}`)
}

async function onDelete(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  const confirmResult = confirm("delete this item?");
  if (!confirmResult) {
    return
  }

  apiService.deleteItem(id);
  page.redirect('/dashboard')
}