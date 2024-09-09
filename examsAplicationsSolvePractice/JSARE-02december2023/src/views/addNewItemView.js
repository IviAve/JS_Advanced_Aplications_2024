import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page (Only for logged-in users) -->
 <section id="create">
    <div class="form">
      <img class="border" src="./images/border.png" alt="">
      <h2>Add Character</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Character Type"
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
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="2"
        cols="10"
      ></textarea>
        <button type="submit">Add Character</button>
      </form>
      <img class="border" src="./images/border.png" alt="">
    </div>
  </section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}
async function onSubmit(data, form) {

  //!!! if in html is image-url must be !data['image-url']

  const {category, imageUrl=data['image-url'], description, moreInfo=data['additional-info']} = data;

  if (!category || !imageUrl || !description || !moreInfo ) {
         return alert("All fields are req")
     }
    
    // if (!data.category || !data['image-url'] || !data.description || !data['additional-info'] ) {
    //     return alert("All fields are req")
    // }
    await apiService.createItem({category,imageUrl,description,moreInfo});
    // await apiService.createItem(data);
    page.redirect('/dashboard')
}