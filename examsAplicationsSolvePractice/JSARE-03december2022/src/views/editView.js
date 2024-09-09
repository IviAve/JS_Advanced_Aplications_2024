import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
 <!-- Edit Page (Only for logged-in users) -->
 <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form @submit=${handler} class="edit-form">
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${item.singer} />
        <input type="text" name="album" id="album-album" placeholder="Album" .value=${item.album} />
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${item.imageUrl} />
        <input type="text" name="release" id="album-release" placeholder="Release date" .value=${item.release} />
        <input type="text" name="label" id="album-label" placeholder="Label" .value=${item.label} />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${item.sales} />

        <button type="submit">post</button>
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
  if (!data.singer || !data.imageUrl || !data.album || !data.release || !data.label || !data.sales) {
      return alert("All fields are required")
  }

  await apiService.updateItem(id, data);
  page.redirect(`/details/${id}`)
}