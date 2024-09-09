import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="create">
    <form @submit=${handler} id="create-form" action="" method="">
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
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
    
  if (!data.title || !data.description || !data.imageUrl || !data.type ) {
      return alert("All fields are required")
  }
  await apiService.createItem(data);
  page.redirect('/dashboard')
}