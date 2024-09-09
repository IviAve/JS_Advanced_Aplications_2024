import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
 <!-- Edit Page (Only for logged-in users) -->
 <section id="edit">
    <div class="form">
      <h2>Edit Fact</h2>
      <form @submit=${handler} class="edit-form">
        <input
        type="text"
        name="category"
        id="category"
        placeholder="Category"
        .value=${item.category}
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        .value=${item.imageUrl}
      />
      <textarea
      id="description"
      name="description"
      placeholder="Description"
      rows="10"
      cols="50"
      .value=${item.description}
    ></textarea>
    <textarea
      id="additional-info"
      name="additional-info"
      placeholder="Additional Info"
      rows="10"
      cols="50"
      .value=${item.moreInfo}
    ></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  </section>
`;

let id = null;
export async function editView(ctx){
   
     id = ctx.params.id;
    const item = await apiService.getItemById(id);
    render(templ(createSubmitHandler(onSubmit), item))
    

  }
    
async function onSubmit(data, form){
  
  const {category, imageUrl=data['image-url'], description, moreInfo=data['additional-info']} = data;
    
  if (!category || !imageUrl || !description || !moreInfo ) {
    return alert("All fields are req")
  }
  
  
  await apiService.updateItem(id, {category,imageUrl,description,moreInfo});
  
  page.redirect(`/details/${id}`)
    
}


//to insert function onSubmit for same imageUrl is imageUrl and more


// async function onSubmit(data, form){
//   if (!data.item || !data.imageUrl || !data.price || !data.availability || !data.type || !data.description) {
//       return alert("All fields are required")
//   }

//   await apiService.updateItem(id, data);
//   page.redirect(`/details/${id}`)
// }