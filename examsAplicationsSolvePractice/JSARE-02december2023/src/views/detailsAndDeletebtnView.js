import { render, html} from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import {page} from "../lib.js";

import * as likesService from "../apies/likesService.js";

const templ = (item, owner, hasUser, hasLiked, likes) => html`
<!-- Details page -->
<section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${item.imageUrl} alt="example1" />
      <div>
      <p id="details-category">${item.category}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p id="description">
            ${item.description}
            </p>
             <p id ="more-info">
              ${item.moreInfo}
                  </p>
        </div>
      </div>
        <h3>Is This Useful:<span id="likes">${likes}</span></h3>

          <!--Edit and Delete are only for creator-->
          ${hasUser ? html `
              <div id="action-buttons">
                  ${owner ? html`
                      <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                      <a href="#" @click=${onDelete} data-id =${item._id} id="delete-btn">Delete</a>
                  ` : ''}
                  ${hasLiked ? null : html`
                      <!--Bonus - Only for logged-in users ( not authors )-->
                      <a href="" @click=${onLike} data-id =${item._id} id="like-btn">Like</a> 
                  `}
          </div>` : ""}
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx){
    const id = ctx.params.id;

    const [item, likesInfo] = await Promise.all([
      apiService.getItemById(id),
      likesService.getLikesById(id)
    ]);

    const userData = getUserData();
    //const item = await apiService.getItemById(id);
    const owner = hasOwner(item._ownerId);
    const hasUser = Boolean(userData);
    const hasLiked = likesInfo.hasLiked || owner;
    const likes = likesInfo.likes;

    render(templ(item, owner, hasUser, hasLiked, likes))
}

async function onLike(e) {
  e.preventDefault();

  const characterId = e.target.dataset.id;
  
  await likesService.postLike({characterId});
  
  page.redirect(`/details/${characterId}`)
}

async function onDelete(e){
    e.preventDefault();
    const id = e.target.dataset.id;
    const confirmResult = confirm("delete this item?");
    if (!confirmResult) {
        return
    }

    apiService.deleteItem(id);
    page.redirect('/dashboard')
}