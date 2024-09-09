import { render, html } from "../lib.js";
import * as apiService from "../apies/methodsForItems.js"
import { getUserData } from "../utils.js";
import * as userService from "../apies/user.js";


const templ = (items, email, pol, username) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${pol}.png">
            <div class="user-content">
                <p>Username: ${username}</p>
                <p>Email: ${email}</p>
                <p>My memes count: ${items.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            <!-- Display : All created memes by this user (If any) -->
            ${items.map(item => itemTemplate(item))}   
            ${items.length === 0 ? html `<p class="no-memes">No memes in database.</p>` : ""}
        </div>
    </section>
`;

const itemTemplate = (item) => html`
    <div class="user-meme">
        <p class="user-meme-title">${item.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
        <a class="button" href="/details/${item._id}">Details</a>
    </div>
`;

export async function showMyPostView() {
    const userData = getUserData();
    const userId = userData._id;

    const email = userData.email;
    const pol = userData.gender; // ненужни в другия случай
    const userName = userData.username; // ненужни в другия случай

    //Това е за работа с датаБейз
    //const usersArr = userService.userDataBase;
    //let findUser = usersArr.find(user => user.email === email);
    //const pol = findUser.gender;
    //const userName = findUser.username;

    const posts = await apiService.getMyPost(userId);

    render(templ(posts, email, pol, userName));
}