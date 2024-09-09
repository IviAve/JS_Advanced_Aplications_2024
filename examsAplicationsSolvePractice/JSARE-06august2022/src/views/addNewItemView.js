import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page (Only for logged-in users) -->
 <section id="create">
    <div class="form">
      <h2>Create Offer</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="title"
          id="job-title"
          placeholder="Title"
        />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        ></textarea>
        <input
          type="text"
          name="salary"
          id="job-salary"
          placeholder="Salary"
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>

`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}
async function onSubmit(data, form) {
    
    if (!data.title || !data.imageUrl || !data.category || !data.description || !data.requirements || !data.salary) {
        return alert("All fields are req")
    }
    await apiService.createCar(data);
    page.redirect('/dashboard')
}