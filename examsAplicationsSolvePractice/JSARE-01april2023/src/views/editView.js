import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form">
      <h2>Edit Fruit</h2>
      <form @submit=${handler} class="edit-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Fruit Name"
          .value=${item.name}
        />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image URL"
          .value=${item.imageUrl}
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
          .value=${item.description}
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
          .value=${item.nutrition}
        ></textarea>
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

let id = null;
export async function editView(ctx){
    
     id = ctx.params.id;
    const item = await apiService.getItemById(id);
    
    render(templ(createSubmitHandler(onSubmit), item))
}

async function onSubmit(data, form){
    if (!data.name || !data.imageUrl || !data.description || !data.nutrition ) {
        return alert("All fields are required")
    }

    await apiService.updateItem(id, data);
    page.redirect(`/details/${id}`)
}