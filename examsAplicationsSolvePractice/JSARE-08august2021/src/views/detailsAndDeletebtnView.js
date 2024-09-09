import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import { page } from "../lib.js";

import * as likeService from "../apies/likesService.js";

const templ = (item, owner, hasUser, hasLiked, likes) => html`
<!-- Details Page ( for Guests and Users ) -->
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${item.title}</h3>
        <p class="type">Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        ${hasUser ? html`
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${owner ? html `  
                <a class="button" href="/edit/${item._id}">Edit</a>
            <a class="button" href="#"  @click=${onDelete} data-id =${item._id}>Delete</a> ` : ""}
           

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${hasLiked ? null : html`<a class="button" @click=${onDonate} data-id =${item._id} href="">Like</a>
            `}
            
            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
            <!-- Bonus -->
        </div>` : ""}
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${item.description}</p>
    </div>
  </section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;

  const [item, likesInfo] = await Promise.all([
    apiService.getItemById(id),
    likeService.getLikesById(id)
  ]);

  const userData = getUserData();
  //const item = await apiService.getItemById(id);
  const owner = hasOwner(item._ownerId);
  const hasUser = Boolean(userData);
  const hasLiked = likesInfo.hasLiked || owner;
  const likes = likesInfo.likes;

  render(templ(item, owner, hasUser, hasLiked, likes))
}

async function onDonate(e) {
  e.preventDefault();

  const bookId = e.target.dataset.id;

  await likeService.postLike({ bookId });

  page.redirect(`/details/${bookId}`)
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