import { render, html} from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import {page} from "../lib.js";



const templ = (item, owner) => html`
<!-- Details Meme Page (for guests and logged users) -->
<section id="meme-details">
    <h1>Meme Title: ${item.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${item.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${item.description}
            </p>

          <!--Edit and Delete are only for creator-->
          ${owner ? html`
           <!--Edit and Delete are only for creator-->

           <a class="button warning" href="/edit/${item._id}">Edit</a>
            <button  @click=${onDelete} data-id = ${item._id} class="button danger">Delete</button>
        
          ` : ""
        }
          
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx){
  const id = ctx.params.id;
  const item = await apiService.getItemById(id);
  const owner = hasOwner(item._ownerId)
render(templ(item, owner))
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