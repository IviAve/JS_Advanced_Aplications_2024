import { render, html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import * as apiService from "../apies/methodsForItems.js"
import {page} from "../lib.js";


const templ = (handler) => html`
 <!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="auth">
    <form @submit=${handler} id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>
`;

export function addNewItemView() {

    render(templ(createSubmitHandler(onSubmit)));
}

//!!! if in html is image-url must be !data['image-url']

async function onSubmit(data, form) {

  

  const {title, category, imageUrl, maxLevel, summary} = data;

  if (!title || !category ||!imageUrl || !maxLevel || !summary ) {
         return alert("All fields are req")
     }
    
    
    await apiService.createItem({title, category, imageUrl, maxLevel,summary});
    
    page.redirect('/')
}