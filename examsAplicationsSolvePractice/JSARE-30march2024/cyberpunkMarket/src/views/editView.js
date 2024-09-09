import { render, html } from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import { page } from "../lib.js";

import {notifyView} from "./notification.js"

const templ = (handler, item) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form form-item">
      <h2>Edit Your Item</h2>
      <form @submit=${handler} class="edit-form">
        <input type="text" name="item" id="item" placeholder="Item" .value=${item.item} />
        <input
          type="text"
          name="imageUrl"
          id="item-image"
          placeholder="Your item Image URL"
          .value=${item.imageUrl}
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
          .value=${item.price}
        />
        <input
          type="text"
          name="availability"
          id="availability"
          placeholder="Availability Information"
          .value=${item.availability}
        />
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Item Type"
          .value=${item.type}
        />
        <textarea
          id="description"
          name="description"
          placeholder="More About The Item"
          rows="10"
          cols="50"
          .value=${item.description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

let id = null;
export async function editView(ctx) {

  id = ctx.params.id;
  const item = await apiService.getItemById(id);
  debugger
  render(templ(createSubmitHandler(onSubmit), item))


}



//to insert function onSubmit for same imageUrl is imageUrl and more


async function onSubmit(data, form){
  if (!data.item || !data.imageUrl || !data.price || !data.availability || !data.type || !data.description) {
      return notifyView("All fields are required")
  }

  await apiService.updateItem(id, data);
  page.redirect(`/details/${id}`)
}