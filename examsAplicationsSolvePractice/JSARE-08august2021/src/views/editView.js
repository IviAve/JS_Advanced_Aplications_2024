import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
 <!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="edit">
    <form @submit=${handler} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${item.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description" .value=${item.description}> 
                       </textarea>
                        
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${item.imageUrl}>
                    
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" value="Fiction">
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                        .value=${item.type}
                    </select>
                    
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>
`;

let id = null;
export async function editView(ctx){
   
     id = ctx.params.id;
    const item = await apiService.getItemById(id);
    render(templ(createSubmitHandler(onSubmit), item))
    

  }
    
// async function onSubmit(data, form){
  
//   const {category, imageUrl=data['image-url'], description, moreInfo=data['additional-info']} = data;
    
//   if (!category || !imageUrl || !description || !moreInfo ) {
//     return alert("All fields are req")
//   }
  
  
//   await apiService.updateItem(id, {category,imageUrl,description,moreInfo});
  
//   page.redirect(`/details/${id}`)
    
// }


//to insert function onSubmit for same imageUrl is imageUrl and more


async function onSubmit(data, form){
  if (!data.title || !data.description || !data.imageUrl || !data.type ) {
      return alert("All fields are required")
  }

  await apiService.updateItem(id, data);
  page.redirect(`/details/${id}`)
}