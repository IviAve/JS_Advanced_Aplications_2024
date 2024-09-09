import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
<!-- Create Page (Only for logged-in users) -->
<section id="create">
    <div class="form form-auto">
      <h2>Share Your Car</h2>
      <form @submit=${handler} class="create-form">
        <input type="text" name="model" id="model" placeholder="Model"/>
        <input
          type="text"
          name="imageUrl"
          id="car-image"
          placeholder="Your Car Image URL"
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
        />
        <input
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight in Kg"
        />
        <input
          type="text"
          name="speed"
          id="speed"
          placeholder="Top Speed in Kmh"
        />
        <textarea
          id="about"
          name="about"
          placeholder="More About The Car"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  </section>

`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}
async function onSubmit(data, form) {
    
    if (!data.about || !data.imageUrl || !data.model || !data.price || !data.speed || !data.weight) {
        return alert("All fields are req")
    }
    await apiService.createCar(data);
    page.redirect('/dashboard')
}