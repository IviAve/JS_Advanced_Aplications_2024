import { render, html} from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import {page} from "../lib.js";

import * as likesService from "../apies/likesService.js";

const templ = (item, owner, hasUser, hasLiked, likes) => html`
 <!-- Details page -->
 <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src=${item.imageUrl} alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
        <p>
          <strong>Album name:</strong><span id="details-album">${item.album}</span>
        </p>
        <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

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

  const albumId = e.target.dataset.id;
  
  await likesService.postLike({albumId});
  
  page.redirect(`/details/${albumId}`)
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