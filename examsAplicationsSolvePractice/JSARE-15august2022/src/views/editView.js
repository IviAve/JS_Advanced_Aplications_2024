import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form">
      <h2>Edit item</h2>
      <form @submit=${handler} class="edit-form">
        <input
          type="text"
          name="brand"
          id="shoe-brand"
          placeholder="Brand"
          .value=${item.brand}
        />
        <input
          type="text"
          name="model"
          id="shoe-model"
          placeholder="Model"
          .value=${item.model}
        />
        <input
          type="text"
          name="imageUrl"
          id="shoe-img"
          placeholder="Image url"
          .value=${item.imageUrl}
        />
        <input
          type="text"
          name="release"
          id="shoe-release"
          placeholder="Release date"
          .value=${item.release}
        />
        <input
          type="text"
          name="designer"
          id="shoe-designer"
          placeholder="Designer"
          .value=${item.designer}
        />
        <input
          type="text"
          name="value"
          id="shoe-value"
          placeholder="Value"
          .value=${item.value}
        />

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
    if (!data.brand || !data.model || !data.imageUrl || !data.release || !data.designer || !data.value ) {
        return alert("All fields are required")
    }

    await apiService.updateItem(id, data);
    page.redirect(`/details/${id}`)
}