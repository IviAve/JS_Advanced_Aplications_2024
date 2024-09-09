import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
<!-- Create Page (Only for logged-in users) -->
<section id="create">
    <div class="form">
      <h2>Add Fruit</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Fruit Name"
        />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image"
        />
        <textarea
        id="fruit-description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
      ></textarea>
        <button type="submit">Add Fruit</button>
      </form>
    </div>
  </section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
    
}
async function onSubmit(data, form) {
    
    if (!data.name || !data.imageUrl || !data.description || !data.nutrition ) {
        return alert("All fields are required")
    }
    await apiService.createItem(data);
    page.redirect('/dashboard')
}