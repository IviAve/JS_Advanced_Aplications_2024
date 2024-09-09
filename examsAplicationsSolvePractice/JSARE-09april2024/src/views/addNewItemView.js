import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
        <div class="form">
          <img class="border" src="./images/border.png" alt="" />
          <h2>Add Solution</h2>
          <form @submit=${handler} class="create-form">
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Solution Type"
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
            />
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="more-info"
              name="more-info"
              placeholder="more Info"
              rows="2"
              cols="10"
            ></textarea>
            <button type="submit">Add Solution</button>
          </form>
        </div>
      </section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}
//!!! if in html is image-url must be !data['image-url'] this is function onSubmit

async function onSubmit(data, form) {

  const {type, imageUrl=data['image-url'], description, learnMore=data['more-info']} = data;

  if (!type || !imageUrl || !description || !learnMore ) {
         return alert("All fields are req")
     }
    
    
    await apiService.createItem({type,imageUrl,description,learnMore});
    
    page.redirect('/dashboard')
}


//to insert onSubmit when imageUrl in html is same like imageUrl