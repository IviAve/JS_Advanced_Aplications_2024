import {showDetails} from "./detailsView.js"; // импортираме си функцията showDetails от файлът: detailsView

// Get all urls:
const endpoints = {
    posts: 'http://localhost:3030/jsonstore/collections/myboard/posts',
    comments: 'http://localhost:3030/jsonstore/collections/myboard/comments'
}

const mainRef = document.querySelector('main'); // взимаме си mainRef
const topicBorderRef = document.querySelector('div.new-topic-border');
const topicTitleRef = document.querySelector('div.topic-title');
const topicContainer = document.querySelector('div.topic-container');

const formRef = mainRef.querySelector('form'); // взимаме си formRef от mainRef
formRef.addEventListener('submit', onSubmit) // добавяме eventListener с функция onSubmit при submit-ването му


// Function to show home page and posts:
export async function showHome() { // правим async фунцкия showHome за home button-а от навигацията

    mainRef.replaceChildren(topicBorderRef); // при функцията showHome, замени съдържанието в себе си с topicBorderRef
    mainRef.appendChild(topicTitleRef); // при функцията showHome, main да append-не topicTitleRef

    // Правим "GET" request към endpoints.posts и запзваме response-а в posts
    const response = await fetch(endpoints.posts);
    const posts = await response.json();

    topicContainer.innerHTML = ""; // изчистваме innerHTML
    Object.values(posts).forEach(x => { // за всеки един post от posts
        const post = createPost(x); // извикваме функцията createPost подаваме й параметър x (post) и го запазваме в променливата post
        topicContainer.appendChild(post); // append-ваме го към topicContainer
    })
}

// Function creating post:
function createPost(post) { // правим функция за създаване на постовете
    const divContainer = document.createElement('div'); // създаваме divContainer
    divContainer.classList.add('topic-name-wrapper'); // добавяме му classList
    divContainer.innerHTML = ` 
       <div class="topic-name">
            <a href="#" class="normal" data-id=${post._id}>
                <h2>${post.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${post.date}</time></p>
                    <div class="nick-name">
                        <p>Username: ${post.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `
    divContainer.querySelector("a").addEventListener('click', showDetails); // на title ancher-а му слагаме eventListener и му добавяме функция showDetails
    return divContainer; // return-ваме divContainer-а
}

// Submit function for the topic buttons:
function onSubmit(e) { // правим функция onSubmit за бутоните от topic-a
    e.preventDefault();

    if (e.submitter.classList.contains('cancel')) { // Ако бутона е clear:
        clear(e.target) // изчисти полетата на формата
        return; // return-и
    }

    const formData = new FormData(e.target); // взимаме си input-ите на formData-та
    const title = formData.get('topicName'); // взимаме title от формата
    const username = formData.get('username'); // взимаме username от формата
    const content = formData.get('postText'); // взимаме postText от формата


    if (!title || !username || !content) { // проверка
        return;
    }

    savePost({ title, username, content, date: new Date }); // извикваме функцията savePost с параметрите title, username, postText и създаваме дата с date: new Date
    clear(e.target); // изчисти полетата на формата
}

// Function clearing all the form data inputs:
 export function clear(formRef) {
    formRef.reset();
}

// Post function to the database:
async function savePost(data) {
    const option = { // правим option
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(endpoints.posts, option); // Правим "POST" request към endpoints.posts и подаваме option
    showHome(); // извикваме функцията showHome за да се върнем на началната страница
}
