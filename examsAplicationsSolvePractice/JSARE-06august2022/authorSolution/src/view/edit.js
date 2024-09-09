import { html } from "../../node_modules/lit-html/lit-html.js";
import { editOfferById, getOfferById } from "../api/data.js";

const editTamplate = (offer, onSubmit) => html`<section id="edit">
  <div class="form">
    <h2>Edit Offer</h2>
    <form class="edit-form" @submit=${onSubmit}>
      <input type="text" name="title" id="job-title" value="${offer.title}" />
      <input type="text" name="imageUrl" id="job-logo" value="${offer.imageUrl}" />
      <input
        type="text"
        name="category"
        id="job-category"
        value="${offer.category}"
      />
      <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
      >
${offer.description}</textarea
      >
      <textarea id="job-requirements" name="requirements" rows="4" cols="50">
${offer.requirements}</textarea
      >
      <input
        type="text"
        name="salary"
        id="job-salary"
        value="${offer.salary}"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editPage(ctx) {
  const offerId = ctx.params.id;

  const offer = await getOfferById(offerId);
  ctx.render(editTamplate(offer, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const editOffer = {
      title: formData.get("title").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      category: formData.get("category").trim(),
      description: formData.get("description").trim(),
      requirements: formData.get("requirements").trim(),
      salary: formData.get("salary").trim(),
    };

    if (Object.values(editOffer).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editOfferById(offerId, editOffer);
    event.target.reset();
    ctx.page.redirect(`/details/${offerId}`);
  }
}
