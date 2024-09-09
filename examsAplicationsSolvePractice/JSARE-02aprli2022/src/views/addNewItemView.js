import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!--Create Page-->
<section id="createPage">
    <form @submit=${handler} class="createForm">
        <img src="./images/cat-create.jpg">
        <div>
            <h2>Create PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" placeholder="Max">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" placeholder="2 years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" placeholder="5kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
            </div>
            <button class="btn" type="submit">Create Pet</button>
        </div>
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
    
  if (!data.name || !data.breed || !data.image || !data.age || !data.weight ) {
      return alert("All fields are required")
  }
  await apiService.createItem(data);
  page.redirect('/dashboard')
}