import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page (Only for logged-in users) -->
 <section id="create">
    <div class="form">
      <h2>Add Event</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Event"
        />
        <input
          type="text"
          name="imageUrl"
          id="event-image"
          placeholder="Event Image URL"
        />
        <input
          type="text"
          name="category"
          id="event-category"
          placeholder="Category"
        />


        <textarea
          id="event-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        ></textarea>
        
        <input
        type="text"
        name="date"
        id="date"
        placeholder="When?"
      />

        <button type="submit">Add</button>
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
    
  if (!data.name || !data.imageUrl || !data.category || !data.description || !data.date) {
      return alert("All fields are required")
  }
  await apiService.createItem(data);
  page.redirect('/dashboard')
}