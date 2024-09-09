import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
 <!-- Edit Page (Only for logged-in users) -->
 <section id="edit">
    <div class="form">
      <h2>Edit Offer</h2>
      <form @submit=${handler} class="edit-form">
        <input
          type="text"
          name="title"
          id="job-title"
          placeholder="Title"
          .value=${item.title}
        />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
          .value=${item.imageUrl}
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
          .value=${item.category}
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
          .value=${item.description}
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
          .value=${item.requirements}
        ></textarea>
        <input
          type="text"
          name="salary"
          id="job-salary"
          placeholder="Salary"
          .value=${item.salary}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

let id = null;
export async function editView(ctx){
    debugger
     id = ctx.params.id;
    const item = await apiService.getItemById(id);
    render(templ(createSubmitHandler(onSubmit), item))
}

async function onSubmit(data, form){
    if (!data.title || !data.imageUrl || !data.category || !data.description || !data.requirements || !data.salary) {
        return alert("All fields are req")
    }

    await apiService.updateCar(id, data);
    page.redirect(`/details/${id}`)
}