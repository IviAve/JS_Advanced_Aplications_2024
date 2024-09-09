import {render, html} from "../lib.js";

import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"


const templ = (handler, results) => html`
 <!-- Search page -->
 <section id="search">

  <div class="form">
    <h2>Search</h2>
    <form @submit=${handler} class="search-form">
      <input
        type="text"
        name="search"
        id="search-input"
      />
      <button class="button-list">Search</button>
    </form>
  </div>
    <!--  todo show result -->
    ${renderResults(results)}
  </section>
`;



export function searchView(){
    render(templ(createSubmitHandler(onSubmit)))
}

async function onSubmit(data,form){
    if (!data.search) {
        return alert("Empty")
    }

    const result = await apiService.searchItem(data.search);
    render(templ(createSubmitHandler(onSubmit),result))
}
function renderResults (result){
   
     if(!result || result.length === 0){
        return html`
        <h4>Results:</h4>
    <div class="search-result">
   <p class="no-result">No result.</p>`
    }

    return result.map(item =>{
       return html`<div class="fruit">
       <img src=${item.imageUrl} alt="example1" />
       <h3 class="title">${item.name}</h3>
       <p class="description">${item.description}</p>
       <a class="details-btn" href="/details/${item._id} ">More Info</a>
     </div>`})
     
}