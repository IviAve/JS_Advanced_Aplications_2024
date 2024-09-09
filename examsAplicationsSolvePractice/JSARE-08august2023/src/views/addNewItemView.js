import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
<!-- Create Page (Only for logged-in users) -->
 
 <section id="create">
    <h2>Add Motorcycle</h2>
    <div class="form">
      <h2>Add Motorcycle</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="model"
          id="model"
          placeholder="Model"
        />
        <input
          type="text"
          name="imageUrl"
          id="moto-image"
          placeholder="Moto Image"
        />
        <input
        type="number"
        name="year"
        id="year"
        placeholder="Year"
      />
      <input
      type="number"
      name="mileage"
      id="mileage"
      placeholder="mileage"
    />
    <input
      type="text"
      name="contact"
      id="contact"
      placeholder="contact"
    />
      <textarea
        id="about"
        name="about"
        placeholder="about"
        rows="10"
        cols="50"
      ></textarea>
        <button type="submit">Add Motorcycle</button>
      </form>
    </div>
  </section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}
async function onSubmit(data, form) {
    
    if (!data.about || !data.imageUrl || !data.model || !data.contact || !data.mileage || !data.year) {
        return alert("All fields are req")
    }
    await apiService.createCar(data);
    page.redirect('/dashboard')
}