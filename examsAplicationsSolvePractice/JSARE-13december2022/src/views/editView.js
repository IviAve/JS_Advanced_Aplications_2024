import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
 <!-- Edit Page (Only for logged-in users) -->
 <section id="edit">
    <div class="form">
      <h2>Edit Product</h2>
      <form @submit=${handler} class="edit-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Product Name"
          .value=${item.name}
        />
        <input
          type="text"
          name="imageUrl"
          id="product-image"
          placeholder="Product Image"
          .value=${item.imageUrl}
        />
        <input
          type="text"
          name="category"
          id="product-category"
          placeholder="Category"
          .value=${item.category}
        />
        <textarea
          id="product-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
          .value=${item.description}
        ></textarea>

        <input
          type="text"
          name="price"
          id="product-price"
          placeholder="Price"
          .value=${item.price}
        />
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
  if (!data.name || !data.imageUrl || !data.category ||!data.price || !data.description) {
      return alert("All fields are required")
  }

  await apiService.updateItem(id, data);
  page.redirect(`/details/${id}`)
}