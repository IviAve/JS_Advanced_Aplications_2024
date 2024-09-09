import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData, hasOwner } from "../utils.js";
import { page } from "../lib.js";

import * as buyService from "../apies/buyService.js";

const templ = (item, owner, hasUser, hasBuy, buy) => html`
<!-- Details page -->
<section id="details">
    <div id="details-wrapper">
      <img
        id="details-img"
        src=${item.imageUrl}
        alt="example1"
      />
      <p id="details-title">${item.name}</p>
      <p id="details-category">
        Category: <span id="categories">${item.category}</span>
      </p>
      <p id="details-price">
        Price: <span id="price-number">${item.price}</span>$
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Bought: <span id="buys">${buy}</span> times.</h4>
          <span
            >${item.description}</span
          >
        </div>
      </div>

          <!--Edit and Delete are only for creator-->
          ${hasUser ? html`
          <div id="action-buttons">
                
                  ${owner ? html`
                  
             <a href="/edit/${item._id}" id="edit-btn">Edit</a>
             <a href="#" @click=${onDelete} data-id =${item._id} id="delete-btn">Delete</a>
                      
                  ` : ''}
                  ${hasBuy ? null : html`
                      
                      <!--Bonus - Only for logged-in users ( not authors )-->
             <a href="" @click=${onBuy} data-id =${item._id} id="buy-btn">Buy</a>
                      
                      
                  `}
          </div>` : ""}
      </div>
    </div>
  </section>
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;

  const [item, buyInfo] = await Promise.all([
    apiService.getItemById(id),
    buyService.getBuyById(id)
  ]);

  const userData = getUserData();
  //const item = await apiService.getItemById(id);
  const owner = hasOwner(item._ownerId);
  const hasUser = Boolean(userData);
  const hasBuy = buyInfo.hasBuy || owner;
  const buy = buyInfo.buy;

  render(templ(item, owner, hasUser, hasBuy, buy))
}

async function onBuy(e) {
  e.preventDefault();

  const productId = e.target.dataset.id;

  await buyService.postBuy({ productId });

  page.redirect(`/details/${productId}`)
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