import {html, render} from "../lib.js"
import { getRecentGames } from "../apies/methodsForItems.js";

const homeTemplate = (games) => html`
 <section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="/images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>
    ${games.length > 0 ? games.map(game => gamesTemplate(game)) : html`<p class="no-articles">No games yet</p>`}
</div>
</section>`;

const gamesTemplate = (game) => html`
<div class="game">
        <div class="image-wrap">
            <img src=${game.imageUrl}>
        </div>
        <h3>${game.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${game._id}" class="btn details-btn">Details</a>
        </div>
</div>`;

export async function showHome() {
    let games = await getRecentGames();
    games = games.slice(0, 3)

    render(homeTemplate(games));   
}

