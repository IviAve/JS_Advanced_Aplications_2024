//Get all urls:

import {showHome} from "./homeView.js";
const endpoints = {
    posts: 'http://localhost:3030/jsonstore/collections/myboard/posts',
    comments: 'http://localhost:3030/jsonstore/collections/myboard/comments'
}

const mainRef = document.querySelector('main'); // взимаме си mainRef
const themeContentRef = document.querySelector("div.theme-content");
const themeTitleRef = document.querySelector('div.theme-title');
const commentsRef = document.querySelector('div.comment');
const commentFormSectionRef = document.querySelector('div.answer');


let postId = null;

// Function to show details when clicking the post article:
export async function showDetails(e) {
    mainRef.replaceChildren(themeContentRef); // при функцията showDetails, main да замени topicBorderRef с themeContentRef
    commentFormSectionRef?.querySelector("form").addEventListener('submit', onCreateComment); // Ако има commentFormSectionRef (ако има коментари) избираме form и закачаме eventListener с функция onCreateComment
    postId = e.currentTarget.dataset.id; // postId = id-то на item-а върху, който сме кликнали

    const response = await fetch(endpoints.posts + "/" + postId); // правим "GET" request към comments url-а + id-то на item-а, върху който сме цъкнали
    const post = await response.json(); // взимаме поста

    const title = createPostTitle(post); // създаваме title като викаме функцията createPostTitle с параметър post
    const details = createPostDetails(post); // създаваме details като викаме функцията createPostDetails с параметър post
    const comments = await getComments(); //  взимаме comments като и ИЗЧАКВАМЕ функцията getComments
    
    themeTitleRef.replaceChildren(title); // заменяме всичко от themeTitleRef с title
    commentsRef.replaceChildren(details); // заменяме всичко от commentsRef с details

    showComments(postId, Object.values(comments)); // извикваме showComments с postId и Object.values(comments)
}

// Function showing all the comments:
function showComments (postId, data) {
    const container = document.createElement('div'); // създаваме container-а
    container.id = "user-comment"; // set-ваме му id

    // За всеки един от коментарите, викаме функцията createComment(), подаваме параметър (коментара) и към container-а append-ваме коментара
    data.filter(x => x.postId === postId).forEach(x => { 
        const comment = createComment(x); 
        container.appendChild(comment); // към контейнера append-ваме коментара
    });

    commentsRef.appendChild(container); // към commentsRef append-ваме container-a с всички коментари
}

// Function creating the DOM of the comments:
function createComment(comment) {
    const container = document.createElement('div'); // създаваме контейнера, в който ще бъде коментара
    container.classList.add('topic-name-wrapper'); // добавяме му classList
    container.innerHTML = `
        <div class="topic-name">
            <p><strong>${comment.username}</strong> commented on <time>${comment.date}</time></p>
                <div class="post-content">
                    <p>${comment.commentText}</p>
                </div>
            </div>
    `

    return container; // return-ваме
}

// Function to get the comments from the database:
async function getComments() { 
    const response = await fetch(endpoints.comments);
    const data = await response.json();
    
    return data;
}

// Function to create the DOM of the post title
function createPostTitle(post) {

    const divContainer = document.createElement('div'); // създаваме divContainer, в който ще сложим нашия title
    divContainer.classList.add('theme-name-wrapper'); // добавяме му classList

    divContainer.innerHTML = `
                <div class="theme-name">
                    <h2>${post.title}</h2>
                </div>
            `
    return divContainer; // return-ваме
}

// Function to create the DOM of the post details:
function createPostDetails(post) { 
    const divContainer = document.createElement('div'); // създаваме divContainer, в който ще сложим нашите details
    divContainer.classList.add('header');
    divContainer.innerHTML = `
        <img src="./static/profile.png" alt="avatar">
        <p><span>${post.username}</span> posted on <time>${post.date}</time></p>
        <p class="post-content">${post.content}</p>
    `

    return divContainer; // return-ваме divContainer
}

// Function to get the data from the form of the comments:
function onCreateComment(e) {
    e.preventDefault();

    const formData = new FormData(e.target); // взимаме formData от формата
    const commentText = formData.get('postText'); // взимаме си текста на коментара от formData
    const username = formData.get('username'); // взимаме си username-a на потребителя, създал коментара от formData

    if (!commentText || !username) { // Ако няма commentText или username
        return; // return-ни без да пускаш "POST" заявка
    }

    // в противен случай викни функцията saveComment с дадените параметри:
    saveComment({ username, date: new Date(), postId, commentText});
}

// Function to save the data in the database from the formData of the comments:
async function saveComment(data) { 
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    }

    const response = await fetch(endpoints.comments, option);
   showHome();

}






