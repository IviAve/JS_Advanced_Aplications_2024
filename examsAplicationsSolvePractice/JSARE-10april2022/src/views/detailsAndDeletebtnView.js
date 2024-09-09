import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import { page } from "../lib.js";

import * as donateService from "../apies/donateService.js";

const templ = (item, owner, hasUser, hasDonate, donates) => html`
<!-- Details page -->

<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${item.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${item.title}</h2>
                <p class="post-description">Description: ${item.description}</p>
                <p class="post-address">Address: ${item.address}</p>
                <p class="post-number">Phone number: ${item.phone}</p>
                <p class="donate-Item">Donate Materials: ${donates}</p>

          ${hasUser ? html`
                <div class="btns">
                  ${owner ? html`
                  <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                  <a href="#" @click=${onDelete} data-id =${item._id} class="delete-btn btn">Delete</a>   
                  ` : ''}
                  ${hasDonate ? null : html`
                      <!--Bonus - Only for logged-in users ( not authors )-->
                      <a href="" @click=${onDonate} data-id =${item._id} class="donate-btn btn">Donate</a>
                      
                      
                  `}
                </div>` : ""}
         </div>
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;

  const [item, donateInfo] = await Promise.all([
    apiService.getItemById(id),
    donateService.getDonateById(id)
  ]);

  const userData = getUserData();
  //const item = await apiService.getItemById(id);
  const owner = hasOwner(item._ownerId);
  const hasUser = Boolean(userData);
  const hasDonate = donateInfo.hasDonate || owner;
  const donates = donateInfo.donates;

  render(templ(item, owner, hasUser, hasDonate, donates))
}

async function onDonate(e) {
  e.preventDefault();

  const postId = e.target.dataset.id;

  await donateService.postDonate({ postId });

  page.redirect(`/details/${postId}`)
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