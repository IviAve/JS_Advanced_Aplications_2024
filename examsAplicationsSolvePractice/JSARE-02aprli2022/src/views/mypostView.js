import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData } from "../utils.js";


const templ = (items) => html`
 <section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    <!-- Display a div with information about every post (if any)-->
   
   <div class="my-posts">
   
${items.map(item => itemTemplate(item))}
        
    </div>

  ${items.length === 0 ? html `<h1 class="title no-posts-title">You have no posts yet!</h1>` : ""}

    </section>
`;

const itemTemplate = (item) => html`

<div class="post">
            <h2 class="post-title">${item.title}</h2>
            <img class="post-image" src=${item.imageUrl} alt="Material Image">
            <div class="btn-wrapper">
                <a href="/details/${item._id}" class="details-btn btn">Details</a>
            </div>
</div>
`;

export async function showMyPostView() {
    const userData = getUserData();
    const userId = userData._id;

    const posts = await apiService.getMyPost(userId);

    render(templ(posts));
}