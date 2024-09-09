document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();

    async function loadRecipes() {
        const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
        const response = await fetch(url);
        const data = await response.json();

        const main = document.querySelector('main');
        main.innerHTML = ''; // Clear any existing content

        Object.values(data).forEach(createRecipeCard);
    }

    function createRecipeCard(recipe) {
        const main = document.querySelector('main');

        const article = document.createElement('article');
        article.classList.add('preview');
        article.dataset.id = recipe._id;

        article.innerHTML = `
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src="${recipe.img}">
            </div>
        `;

        article.addEventListener('click', toggleRecipeDetails);
        main.appendChild(article);
    }

    async function toggleRecipeDetails(event) {
        const id = event.currentTarget.dataset.id;
        const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;

        const response = await fetch(url);
        const data = await response.json();

        const article = document.createElement('article');

        article.innerHTML = `
            <h2>${data.name}</h2>
            <div class="band">
                <div class="thumb">
                    <img src="${data.img}">
                </div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${data.ingredients.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${data.steps.map(step => `<p>${step}</p>`).join('')}
            </div>
        `;

        // Replace the preview card with the full details
        event.currentTarget.replaceWith(article);

        // Add an event listener to collapse the details on click
        article.addEventListener('click', async (event) => {
            const previewArticle = createPreviewArticle(data);
            article.replaceWith(previewArticle);
            previewArticle.addEventListener('click', toggleRecipeDetails);
        });
    }

    function createPreviewArticle(recipe) {
        const article = document.createElement('article');
        article.classList.add('preview');
        article.dataset.id = recipe._id;

        article.innerHTML = `
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src="${recipe.img}">
            </div>
        `;
        return article;
    }
});