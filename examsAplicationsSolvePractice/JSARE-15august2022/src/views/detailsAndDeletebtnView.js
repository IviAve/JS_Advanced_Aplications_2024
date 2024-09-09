import { render, html} from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { hasOwner } from "../utils.js";
import {page} from "../lib.js"

const templ = (item, owner) => html`

<!-- Details page -->
<section id="details">
    <div id="details-wrapper">
      <p id="details-title">Shoe Details</p>
      <div id="img-wrapper">
        <img src=${item.imageUrl} alt="example1" />
      </div>
      <div id="info-wrapper">
        <p>Brand: <span id="details-brand">${item.brand}</span></p>
        <p>
          Model: <span id="details-model">${item.model}</span>
        </p>
        <p>Release date: <span id="details-release">${item.release}</span></p>
        <p>Designer: <span id="details-designer">${item.designer}</span></p>
        <p>Value: <span id="details-value">${item.value}</span></p>
      </div>
       
        <!--Edit and Delete are only for creator-->
        ${owner ? 
        html`
       <div id="action-buttons">
          <a href="/edit/${item._id}" id="edit-btn">Edit</a>
          <a href="#" @click=${onDelete} data-id =${item._id} id="delete-btn">Delete</a>
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