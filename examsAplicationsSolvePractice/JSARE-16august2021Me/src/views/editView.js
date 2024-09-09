import {render, html} from "../lib.js";

import * as apiService from "../apies/methodsForItems.js"
import { createSubmitHandler } from "../utils.js";
import {page} from "../lib.js";


const templ = (handler, item) => html`
<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="auth">
    <form @submit=${handler} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value=${item.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value=${item.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${item.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value=${item.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"> .value=${item.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`;

let id = null;
export async function editView(ctx){
   
     id = ctx.params.id;
    const item = await apiService.getItemById(id);
    render(templ(createSubmitHandler(onSubmit), item))
    

  }
    // await apiService.createItem(data);
async function onSubmit(data, form){
  
  const {title, category, maxLevel, imageUrl, summary} = data;
    
  if (!title || !category || !maxLevel || !imageUrl || !summary ) {
    return alert("All fields are req")
  }
  
  
  await apiService.updateItem(id, {title, category, maxLevel, imageUrl,summary});
  
  page.redirect(`/details/${id}`)
    
}