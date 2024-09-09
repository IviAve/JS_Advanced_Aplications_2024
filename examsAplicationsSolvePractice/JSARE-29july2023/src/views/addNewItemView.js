import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page (Only for logged-in users) -->
 <section id="create">
    <div class="form">
      <h2>Add Fact</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
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
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
      ></textarea>
        <button type="submit">Add Fact</button>
      </form>
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
    
    
    await apiService.createItem({category,imageUrl,description,moreInfo});
    
    page.redirect('/dashboard')
}


//to insert onSubmit when imageUrl in html is same like imageUrl

// async function onSubmit(data, form) {
    
//   if (!data.item || !data.imageUrl || !data.price || !data.availability || !data.type || !data.description) {
//       return alert("All fields are required")
//   }
//   await apiService.createItem(data);
//   page.redirect('/dashboard')
// }