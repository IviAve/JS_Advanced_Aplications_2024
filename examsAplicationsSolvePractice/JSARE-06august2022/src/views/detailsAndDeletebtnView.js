import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import { page } from "../lib.js"

import * as applyService from "../apies/applyService.js"

const templ = (item, owner, hasUser, hasApply, applies) => html`
<!-- Details page -->
<section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${item.imageUrl} alt="example1" />
      <p id="details-title">${item.title}</p>
      <p id="details-category">
        Category: <span id="categories">${item.category}</span>
      </p>
      <p id="details-salary">
        Salary: <span id="salary-number">${item.salary}</span>
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span
            >${item.description}</span
          >
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span
            >${item.requirements}</span
          >
        </div>
      </div>
      <p>Applications: <strong id="applications">${applies}</strong></p>

      <!--Edit and Delete are only for creator-->
      ${hasUser ? html`
      
      <div id="action-buttons">
      ${owner ?
      html`
        <a href=/edit/${item._id} id="edit-btn">Edit</a>
        <a href="#" @click=${onDelete} data-id=${item._id} id="delete-btn">Delete</a>
` : ""}
${hasApply ? null : html`
<!--Bonus - Only for logged-in users ( not authors )-->
<a href=""  @click=${onApply} data-id=${item._id} id="apply-btn">Apply</a>
`}
        
      </div>
      ` : ""}
    </div>
  </section>
`;


// this is for solve without like or apply .

// export async function detailsView(ctx){
//     const id = ctx.params.id;
//     const item = await apiService.getCarById(id);
//     const owner = hasOwner(item._ownerId)
// render(templ(item, owner))
// }



//this is use when is like or apply in problem

export async function detailsView(ctx) {
  const id = ctx.params.id;

  const [item, applyInfo] = await Promise.all([
    apiService.getItemById(id),
    applyService.getApplyById(id)
  ]);

  const userData = getUserData();
  //const item = await apiService.getItemById(id);
  const owner = hasOwner(item._ownerId);
  const hasUser = Boolean(userData);
  const hasApply = applyInfo.hasApply || owner;
  const applies = applyInfo.applies;

  render(templ(item, owner, hasUser, hasApply, applies))
}

async function onApply(e) {
  e.preventDefault();

  const offerId = e.target.dataset.id;

  await applyService.postApply({offerId});

  page.redirect(`/details/${offerId}`)
}



async function onDelete(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  const confirmResult = confirm("delete this item?");
  if (!confirmResult) {
    return
  }

  apiService.deleteCar(id);
  page.redirect('/dashboard')
}