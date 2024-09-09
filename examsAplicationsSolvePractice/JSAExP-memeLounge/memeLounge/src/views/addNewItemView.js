import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";

import {notifyView} from "./notification.js"



const templ = (handler) => html`
  <!-- Create Meme Page ( Only for logged users ) -->
<section id="create-meme">
    <form @submit=${handler} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}
//!!! if in html is image-url must be !data['image-url'] this is function onSubmit




//to insert onSubmit when imageUrl in html is same like imageUrl

async function onSubmit(data, form) {
    
  if (!data.title || !data.imageUrl || !data.description) {
      return notifyView("All fields are required")
  }
  await apiService.createItem(data);
  page.redirect('/dashboard')
}