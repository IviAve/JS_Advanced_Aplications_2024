import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page (Only for logged-in users) -->
 <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form @submit=${handler} class="create-form">
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
        <input type="text" name="release" id="album-release" placeholder="Release date" />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
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
    
  if (!data.singer || !data.imageUrl || !data.album || !data.release || !data.label || !data.sales) {
      return alert("All fields are required")
  }
  await apiService.createItem(data);
  page.redirect('/dashboard')
}