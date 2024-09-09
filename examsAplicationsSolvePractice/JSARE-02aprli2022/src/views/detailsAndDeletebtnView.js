import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import { page } from "../lib.js";

import * as donateService from "../apies/donateService.js";

 


const templ = (item, owner, hasUser, hasDonate, donates) => html`
<!--Details Page-->
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${item.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${item.name}</h1>
                <h3>Breed: ${item.breed}</h3>
                <h4>Age: ${item.age}</h4>
                <h4>Weight: ${item.weight}</h4>
                <h4 class="donation">Donation: ${donates}$</h4>
            </div>
          ${hasUser ? html`
          <div class="actionBtn">
                  ${owner ? html`
                  <a href="/edit/${item._id}" class="edit">Edit</a>
                <a href="#" @click=${onDelete} data-id =${item._id} class="remove">Delete</a>
                     
                  ` : ''}
                  ${hasDonate ? null : html`
                      <!--Bonus - Only for logged-in users ( not authors )-->
                      
                      <a href="" @click=${onDonate} data-id =${item._id} class="donate">Donate</a>
                      
                  `}
                ` : ""}
         </div>
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;

  const [item, donateInfo] = await Promise.all([
    apiService.getItemById(id),
    donateService.getDonateById(id)
  ]);

  const userData = getUserData();
  //const item = await apiService.getItemById(id);
  const owner = hasOwner(item._ownerId);
  const hasUser = Boolean(userData);
  const hasDonate = donateInfo.hasDonate || owner;
  const donates = donateInfo.donates;

  render(templ(item, owner, hasUser, hasDonate, donates))
}

async function onDonate(e) {
  e.preventDefault();

  const petId = e.target.dataset.id;

  await donateService.postDonate({ petId });

  page.redirect(`/details/${petId}`)
}

async function onDelete(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  const confirmResult = confirm("delete this item?");
  if (!confirmResult) {
    return
  }

  apiService.deleteItem(id);
  page.redirect('/dashboard')
}