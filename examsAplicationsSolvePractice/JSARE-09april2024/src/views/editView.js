import { render, html } from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import { page } from "../lib.js";


const templ = (handler, item) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
        <div class="form">
          <img class="border" src="./images/border.png" alt="" />
          <h2>Edit Solution</h2>
          <form  @submit=${handler} class="edit-form">
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Solution Type"
              .value=${item.type}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${item.imageUrl}
            />
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
              .value=${item.description}
            ></textarea>
            <textarea
              id="more-info"
              name="more-info"
              placeholder="more Info"
              rows="2"
              cols="10"
              .value=${item.learnMore}
            ></textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
`;

let id = null;
export async function editView(ctx) {

  id = ctx.params.id;
  const item = await apiService.getItemById(id);
  debugger
  render(templ(createSubmitHandler(onSubmit), item))


}
// function onSubmit for difference between imageUrl and image-url and more
async function onSubmit(data, form) {

  const { type, imageUrl = data['image-url'], description, learnMore = data['more-info'] } = data;

  if (!type || !imageUrl || !description || !learnMore) {
    return alert("All fields are req")
  }


  await apiService.updateItem(id, { type, imageUrl, description, learnMore });

  page.redirect(`/details/${id}`)

}


//to insert function onSubmit for same imageUrl is imageUrl and more