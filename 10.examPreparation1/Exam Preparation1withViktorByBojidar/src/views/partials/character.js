import { html } from "../../lib.js"

export const characterTemp = (data) => html`
<div class="character">
            <img src="${data.imageUrl}" alt="example1" />
            <div class="hero-info">
              <h3 class="category">${data.category}</h3>
              <p class="description">${data.description}</p>
              <a class="details-btn" href="/catalog/${data._id}">More Info</a>
            </div>
            
          </div>
` 