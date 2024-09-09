import { render, html} from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { hasOwner } from "../utils.js";
import {page} from "../lib.js"

const templ = (item, owner) => html`
<!--Details Page-->
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${item.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: $${item.price}</h4>
                <h4>Date: ${item.releaseDate}</h4>
                <p>Description: ${item.description}</p>
            </div>
       
        <!--Edit and Delete are only for creator-->
        ${owner ? 
        html`
        <div class="actionBtn">
                <a href="/edit/${item._id}" class="edit">Edit</a>
                <a href="#" @click=${onDelete} data-id =${item._id} class="remove">Delete</a>
            </div>
        
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