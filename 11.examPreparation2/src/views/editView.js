import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form form-auto">
      <h2>Edit Your Car</h2>
      <form @submit=${handler} class="edit-form">
        <input type="text" name="model" id="model" placeholder="Model" .value=${item.model} />
        <input
          type="text"
          name="imageUrl"
          id="car-image"
          placeholder="Your Car Image URL"
          .value=${item.imageUrl}
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
          .value=${item.price}
        />
        <input
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight in Kg"
          .value=${item.weight}
        />
        <input
          type="text"
          name="speed"
          id="speed"
          placeholder="Top Speed in Kmh"
          .value=${item.speed}
        />
        <textarea
          id="about"
          name="about"
          placeholder="More About The Car"
          rows="10"
          cols="50"
          .value=${item.about}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

let id = null;
export async function editView(ctx){
    debugger
     id = ctx.params.id;
    const item = await apiService.getCarById(id);
    render(templ(createSubmitHandler(onSubmit), item))
}

async function onSubmit(data, form){
    if (!data.about || !data.imageUrl || !data.model || !data.price || !data.speed || !data.weight) {
        return alert("All fields are req")
    }

    await apiService.updateCar(id, data);
    page.redirect(`/details/${id}`)
}