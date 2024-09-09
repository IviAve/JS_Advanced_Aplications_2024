import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page (Only for logged-in users) -->
<section id="create-page" class="auth">
    <form @submit=${handler} id="create">
        <h1 class="title">Create Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone">
        </article>

        <input type="submit" class="btn submit" value="Create Post">
    </form>
</section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}

//!!! if in html is image-url must be !data['image-url']
// async function onSubmit(data, form) {

  

//   const {category, imageUrl=data['image-url'], description, moreInfo=data['additional-info']} = data;

//   if (!category || !imageUrl || !description || !moreInfo ) {
//          return alert("All fields are req")
//      }
    
    
//     await apiService.createItem({category,imageUrl,description,moreInfo});
    
//     page.redirect('/dashboard')
// }


//to insert onSubmit when imageUrl in html is same like imageUrl

async function onSubmit(data, form) {
    
  if (!data.title || !data.description || !data.imageUrl || !data.address || !data.phone ) {
      return alert("All fields are required")
  }
  await apiService.createItem(data);
  page.redirect('/dashboard')
}