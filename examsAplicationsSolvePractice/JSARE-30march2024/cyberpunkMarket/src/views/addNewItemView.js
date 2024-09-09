import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";

import {notifyView} from "./notification.js"



const templ = (handler) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form form-item">
      <h2>Share Your item</h2>
      <form @submit=${handler} class="create-form">
        <input type="text" name="item" id="item" placeholder="Item" />
        <input
          type="text"
          name="imageUrl"
          id="item-image"
          placeholder="Your item Image URL"
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
        />
        <input
          type="text"
          name="availability"
          id="availability"
          placeholder="Availability Information"
        />
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Item Type"
        />
        <textarea
          id="description"
          name="description"
          placeholder="More About The Item"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}
//!!! if in html is image-url must be !data['image-url'] this is function onSubmit




//to insert onSubmit when imageUrl in html is same like imageUrl

async function onSubmit(data, form) {
    
  if (!data.item || !data.imageUrl || !data.price || !data.availability || !data.type || !data.description) {
      return notifyView("All fields are required")
  }
  await apiService.createItem(data);
  page.redirect('/dashboard')
}