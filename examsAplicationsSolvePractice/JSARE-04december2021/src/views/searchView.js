import {render, html} from "../lib.js";

import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"


const templ = (handler, results) => html`
 <!--Search Page-->
<section id="searchPage">
    <h1>Search by Name</h1>
    <form @submit=${handler} class="search-form">
    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
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
        <h2>Results:</h2>
        <p class="no-result">No result.</p>`
    }

    return result.map(item =>{
       return html`class="search-result">
       <!--If have matches-->
       <div class="card-box">
           <img src=${item.imgUrl}>
           <div>
               <div class="text-center">
                   <p class="name">Name: ${item.name}</p>
                   <p class="artist">Artist: ${item.artist}</p>
                   <p class="genre">Genre: ${item.genre}</p>
                   <p class="price">Price: $${item.price}</p>
                   <p class="date">Release Date: ${item.releaseDate}</p>
               </div>
               <div class="btn-group">
                   <a href="/details/${item._id}" id="details">Details</a>
               </div>
           </div>
       </div>`})
     
}