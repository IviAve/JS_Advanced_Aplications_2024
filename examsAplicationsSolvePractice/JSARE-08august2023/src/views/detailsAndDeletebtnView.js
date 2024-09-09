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
          <p class="year">Year: ${item.year}</p>
          <p class="mileage">Mileage: ${item.mileage} km.</p>
          <p class="contact">Contact Number: ${item.contact}</p>
             <p id = "motorcycle-description">
              ${item.about}
                  </p>
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