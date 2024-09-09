// import {render, html} from "../lib.js";

// import { createSubmitHandler } from "../utils.js";
// import * as apiService from "../apies/methodsForItems.js"


// const templ = (handler, results) => html`
//  <!-- Search page -->
//  <section id="search">
//     <div class="form">
//       <h4>Search</h4>
//       <form @submit=${handler} class="search-form">
//         <input type="text" name="search" id="search-input" />
//         <button class="button-list">Search</button>
//       </form>
//     </div>
//     <!--  todo show result -->
//     ${renderResults(results)}
//   </section>
// `;



// export function searchView(){
//     render(templ(createSubmitHandler(onSubmit)))
// }

// async function onSubmit(data,form){
//     if (!data.search) {
//         return alert("Empty")
//     }

//     const result = await apiService.searchCar(data.search);
//     render(templ(createSubmitHandler(onSubmit),result))
// }
// function renderResults (result){
   
//      if(!result || result.length === 0){
//         return html`
//         <div class="search-result">
//             <h2 class="no-avaliable">No result.</h2>
//     </div>`
//     }

//     return result.map(item =>{
//        return html`<div class="car">
//         <img src=${item.imageUrl} alt="example1"/>
//         <h3 class="model">${item.model}</h3>
//         <a class="details-btn" href=/details/${item._id}>More Info</a>
//       </div>`})
     
// }