import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page (Only for logged-in users) -->
 <section id="create">
    <div class="form">
      <h2>Add item</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="brand"
          id="shoe-brand"
          placeholder="Brand"
        />
        <input
          type="text"
          name="model"
          id="shoe-model"
          placeholder="Model"
        />
        <input
          type="text"
          name="imageUrl"
          id="shoe-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="shoe-release"
          placeholder="Release date"
        />
        <input
          type="text"
          name="designer"
          id="shoe-designer"
          placeholder="Designer"
        />
        <input
          type="text"
          name="value"
          id="shoe-value"
          placeholder="Value"
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
    
}
async function onSubmit(data, form) {
    
    if (!data.brand || !data.model || !data.imageUrl || !data.release || !data.designer || !data.value ) {
        return alert("All fields are required")
    }
    await apiService.createItem(data);
    page.redirect('/dashboard')
}