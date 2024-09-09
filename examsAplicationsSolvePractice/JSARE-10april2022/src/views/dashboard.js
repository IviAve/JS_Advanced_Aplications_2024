import { html, render} from "../lib.js";
import { getAllItems } from "../apies/methodsForItems.js";


const templ = (items) => html`
 <!-- Dashboard -->
 <section id="dashboard-page">
    <h1 class="title">All Posts</h1>

    <!-- Display a div with information about every post (if any)-->
    <div class="all-posts">
        
${items.map(item => itemTemplate(item))}
        
    </div>

  ${items.length === 0 ? html `<h1 class="title no-posts-title">No posts yet!</h1>` : ""}

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
export async function dashboardView(){
  const posts = await  getAllItems()
  render(templ(posts))
}

