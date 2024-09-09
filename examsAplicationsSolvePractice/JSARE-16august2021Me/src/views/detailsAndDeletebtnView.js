import { render, html} from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler, getUserData, hasOwner } from "../utils.js";
import {page} from "../lib.js";

import { commentGame, getCommentsByGameId  } from "../apies/comments.js";


const templ = (item, owner, comments, hasUser, handler ) => html`
<!--Details Page-->
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${item.imageUrl} />
            <h1>${item.title}</h1>
            <span class="levels">MaxLevel: ${item.maxLevel}</span>
            <p class="type">${item.category}</p>
        </div>

        <p class="text">
            ${item.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                <!-- list all comments for current game (If any) -->
                ${comments ? comments.map(comment => commentTemplate(comment)) : null}
            </ul>
            <!-- Display paragraph: If there are no games in the database -->
             ${comments.length === 0 ? html`<p class="no-comment">No comments.</p>` : null}
        </div>

<!--Edit and Delete are only for creator-->
${owner ? 
        html`
        <div class="buttons">
            <a href="/edit/${item._id}" class="button">Edit</a>
            <a href="#" @click=${onDelete} data-id =${item._id} class="button">Delete</a>
        </div>
        
        ` : ""
    }
      </div>
      <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->

    ${!hasUser || owner ? null : html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${handler} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
                </form>
        </article>
    `}
    </div>
  </section>
         
`;

const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;




export async function detailsView(ctx) {
    const id = ctx.params.id;
    const data = await apiService.getItemById(id);
    const comments = await  getCommentsByGameId(id)
    

    const userData = await getUserData();

    const isOwner = hasOwner(data._ownerId);
    
    render(templ(data, isOwner, comments, Boolean(userData), createSubmitHandler(onComment)));

    async function onComment({comment}, formRef) {
        
        if (!comment) {
            return alert('Oops');
        }
        
        await commentGame(id, comment);

        formRef.reset();
        page.redirect(`/details/${id}`);
    }
}
// export async function detailsView(ctx){
//   const id = ctx.params.id;
//   const item = await apiService.getItemById(id);
//   const owner = hasOwner(item._ownerId)
// render(templ(item, owner))
// }


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