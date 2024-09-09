import { render, html } from "../lib.js";

import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"


const templ = (handler, results) => html`
 <!-- Search Page (Only for logged-in users) -->
 <section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${handler} class="search-wrapper cf">
      <input
        id="#search-input"
        type="text"
        name="search"
        placeholder="Search here..."
        required
      />
      <button type="submit">Search</button>
      </form>

<!--  todo show result -->
      ${renderResults(results)}
    
    </section>

`;



export function searchView() {
  render(templ(createSubmitHandler(onSubmit)))
}

async function onSubmit(data, form) {
  if (!data.search) {
    return alert("Empty")
  }

  const result = await apiService.searchItem(data.search);
  render(templ(createSubmitHandler(onSubmit), result))
}
function renderResults(result) {

  if (!result || result.length === 0) {
    return html`
        <h3>Results:</h3>

<div id="search-container">
<h2>There are no results found.</h2>`
  }

  return result.map(item => {
    return html`<ul class="card-wrapper">
       <!-- Display a li with information about every post (if any)-->
       <li class="card">
         <img src=${item.imageUrl} alt="travis" />
         <p>
           <strong>Brand: </strong><span class="brand">${item.brand}</span>
         </p>
         <p>
           <strong>Model: </strong
           ><span class="model">${item.model}</span>
         </p>
         <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
         <a class="details-btn" href="/details/${item._id}">Details</a>
         
       </li>
     </ul>`})

}