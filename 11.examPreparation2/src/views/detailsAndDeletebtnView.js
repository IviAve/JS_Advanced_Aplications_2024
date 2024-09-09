import { render, html} from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { hasOwner } from "../utils.js";
import {page} from "../lib.js"

const templ = (item, owner) => html`
<!-- Details page -->

<section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${item.imageUrl} alt="example1" />
      <p id="details-title">${item.model}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="price">Price: €${item.price}</p>
          <p class="weight">Weight: ${item.weight} kg</p>
          <p class="top-speed">Top Speed: ${item.speed} kph</p>
          <p id="car-description">
            ${item.about}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${owner ? 
        html`
        <div id="action-buttons">
          <a href=/edit/${item._id} id="edit-btn">Edit</a>
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
    const item = await apiService.getCarById(id);
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

    apiService.deleteCar(id);
    page.redirect('/dashboard')
}