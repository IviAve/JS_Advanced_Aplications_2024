import { getAllCharacters } from "../data/character.js";
import { html, render } from "../lib.js";
import { characterTemp } from "./partials/character.js";

const catalogTemp = (characters) => html`
<h2>Characters</h2>
    <section id="characters">
        ${characters.length ? characters.map(characterTemp) : html`<h2>No added Heroes yet.</h2>`}
</section>`;

export async function catalogView() {
    const characters = await getAllCharacters();
    render(catalogTemp(characters));
}