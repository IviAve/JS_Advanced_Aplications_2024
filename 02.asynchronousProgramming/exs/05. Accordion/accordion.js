
async function solution() {
    // Get the main container element
    const main = document.getElementById('main');

    // URL to fetch the list of articles
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    // Fetch the list of articles
    const response = await fetch(url);
    const data = await response.json();

    // Iterate over each article to create the necessary DOM elements
    data.forEach(a => {
        // Create the accordion container
        let divAccordion = createElement('div', '', ['class', 'accordion']);
        
        // Create the head container with title and button
        let divHead = createElement('div', '', ['class', 'head']);
        let span = createElement('span', a.title);
        let button = createElement('button', 'More', ['class', 'button', 'id', a._id]);

        // Create the extra container for additional content
        let divExtra = createElement('div', '', ['class', 'extra']);
        let p = createElement('p');

        // Append elements appropriately
        button.addEventListener('click', toggle);
        
        divHead.appendChild(span); // Adjusted to append the span first for better semantic flow
        divHead.appendChild(button); // Append button after the span
        divExtra.appendChild(p);
        divAccordion.appendChild(divHead); // Append head before extra for better initial layout
        divAccordion.appendChild(divExtra);
        main.appendChild(divAccordion);
    });

    // Toggle function to show/hide additional content
    async function toggle(ev) {
        const accordion = ev.target.parentNode.parentNode;
        const p = accordion.querySelector('.extra p');
        const extra = accordion.querySelector('.extra');

        const id = ev.target.id;
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

        const response = await fetch(url);
        const data = await response.json();

        p.textContent = data.content;

        const hidden = ev.target.textContent === 'More';
        extra.style.display = hidden ? 'block' : 'none';
        ev.target.textContent = hidden ? 'Less' : 'More';
    }

    // Utility function to create and configure DOM elements
    function createElement(type, content, attributes = []) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
            }
        }

        return element;
    }
}

// Ensure the solution function is called on page load
window.addEventListener('load', solution);
