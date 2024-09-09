import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
<!-- Edit Page (Only for logged-in users) -->

<section id="edit">
      <h2>Edit Motorcycle</h2>
      <div class="form">
        <h2>Edit Motorcycle</h2>
        <form @submit=${handler} class="edit-form">
          <input
            type="text"
            name="model"
            id="model"
            placeholder="Model"
            .value=${item.model}
          />
          <input
            type="text"
            name="imageUrl"
            id="moto-image"
            placeholder="Moto Image"
            .value=${item.imageUrl}
          />
          <input
          type="number"
          name="year"
          id="year"
          placeholder="Year"
          .value=${item.year}
        />
        <input
        type="number"
        name="mileage"
        id="mileage"
        placeholder="mileage"
        .value=${item.mileage}
      />
      <input
        type="number"
        name="contact"
        id="contact"
        placeholder="contact"
        .value=${item.contact}
      />
        <textarea
          id="about"
          name="about"
          placeholder="about"
          rows="10"
          cols="50"
          .value=${item.about}
        ></textarea>
          <button type="submit">Edit Motorcycle</button>
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
    if (!data.about || !data.imageUrl || !data.model || !data.year || !data.mileage || !data.contact) {
        return alert("All fields are req")
    }

    await apiService.updateCar(id, data);
    page.redirect(`/details/${id}`)
}