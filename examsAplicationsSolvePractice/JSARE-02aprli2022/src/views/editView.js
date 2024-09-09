import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
 <!--Edit Page-->
<section id="editPage">
    <form @submit=${handler} class="editForm">
        <img src="./images/editpage-dog.jpg">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" .value=${item.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" .value=${item.breed}>
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" .value=${item.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" .value=${item.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" .value=${item.image}>
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
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
  if (!data.name || !data.breed || !data.image || !data.weight || !data.age  ) {
      return alert("All fields are required")
  }

  await apiService.updateItem(id, data);
  page.redirect(`/details/${id}`)
}