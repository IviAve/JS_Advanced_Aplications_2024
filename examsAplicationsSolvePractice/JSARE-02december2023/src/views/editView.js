import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form">
      <img class="border" src="./images/border.png" alt="">
      <h2>Edit Character</h2>
      <form @submit=${handler} class="edit-form">
        <input
        type="text"
        name="category"
        id="category"
        placeholder="Character Type"
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
      rows="2"
      cols="10"
      .value=${item.description}
    ></textarea>
    <textarea
      id="additional-info"
      name="additional-info"
      placeholder="Additional Info"
      rows="2"
      cols="10"
      .value=${item.moreInfo}
    ></textarea>
        <button type="submit">Edit</button>
      </form>
      <img class="border" src="./images/border.png" alt="">
    </div>
  </section>
`;

let id = null;
export async function editView(ctx){
   
     id = ctx.params.id;
    const item = await apiService.getItemById(id);
    render(templ(createSubmitHandler(onSubmit), item))
    

  }
    // await apiService.createItem(data);
async function onSubmit(data, form){
  
  const {category, imageUrl=data['image-url'], description, moreInfo=data['additional-info']} = data;
    
  if (!category || !imageUrl || !description || !moreInfo ) {
    return alert("All fields are req")
  }
  
  
  await apiService.updateItem(id, {category,imageUrl,description,moreInfo});
  
  page.redirect(`/details/${id}`)
    
}