import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteOfferById,
  getOfferById,
  getTotalApplications,
  didUserApplied,
  apply,
} from "../api/data.js";

const detailsTamplate = (
  offer,
  isOwner,
  onDelete,
  isLoggedIn,
  totalApplicationsCount,
  onClickApplication,
  didUserApply
) => html`<section id="details">
  <div id="details-wrapper">
    <img src="${offer.imageUrl}" alt="example1" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
      Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span>${offer.description}</span>
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${offer.requirements}</span>
      </div>
    </div>
    <p>
      Applications: <strong id="applications">${totalApplicationsCount}</strong>
    </p>
    <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
        : ""}
      ${(() => {
        if (didUserApply == 0) {
          if (isLoggedIn && !isOwner) {
            return html`<a
              href="javascript:void(0)"
              @click=${onClickApplication}
              id="apply-btn"
              >Apply</a
            >`;
          }
        }
      })()}
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const offerId = ctx.params.id;
  const offer = await getOfferById(offerId);
  const user = ctx.user;

  let userId;
  let totalApplicationsCount;
  let didUserApply;

  if (user != null) {
    userId = user._id;
    didUserApply = await didUserApplied(offerId, userId);
  }

  const isOwner = user && offer._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalApplicationsCount = await getTotalApplications(offerId);
  ctx.render(
    detailsTamplate(
      offer,
      isOwner,
      onDelete,
      isLoggedIn,
      totalApplicationsCount,
      onClickApplication,
      didUserApply
    )
  );

  async function onClickApplication() {
    const donation = {
      offerId,
    };
    await apply(donation);

    totalApplicationsCount = await getTotalApplications(offerId);
    didUserApply = await didUserApplied(offerId, userId);
    ctx.render(
      detailsTamplate(
        offer,
        isOwner,
        onDelete,
        isLoggedIn,
        totalApplicationsCount,
        onClickApplication,
        didUserApplied
      )
    );
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteOfferById(offerId);
      ctx.page.redirect("/");
    }
  }
}
