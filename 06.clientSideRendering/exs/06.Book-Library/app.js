import { html, render } from '../node_modules/lit-html/lit-html.js';
const URL = "http://localhost:3030/jsonstore/collections/books";

const rootTable = document.getElementById('rootTable');
const rootForm = document.getElementById('rootForm')

const tableTemp = (books) => html`
<button id="loadBooks" @click=${onLoadAllBook}>LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${books?.map(book => createBookTemp(book))}
        </tbody>
   </table>
`

const createBookTemp = (book) => html`
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button data-id=${book._id} @click=${onEdit}>Edit</button>
                    <button data-id=${book._id} @click=${onDelete}>Delete</button>
                </td>
            </tr>
`


const addFormTemp = () => html`
<form @submit=${onSubmit} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`

const editFormTemp = (book) => html`
<form @submit=${onSubmitEditBook} id="edit-form">
        <input type="hidden" name="id" value=${book._id}>
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." value=${book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." value=${book.autor}>
        <input type="submit" value="Save">
    </form>
`
render(tableTemp(), rootTable);
render(addFormTemp(), rootForm)

function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, author } = Object.fromEntries(formData);
    if (!title || !author) {
        return;
    }
    e.target.reset();
    saveBook({title,author});
}

async function onEdit(e){
    const id = e.target.dataset.id
    const book = await (getBookById(id));

    render(editFormTemp(book), rootForm)
}

function onSubmitEditBook(e){
e.preventDefault();
const formData = new FormData(e.target);
const {id, title, author} = Object.fromEntries(formData);

if (!title || !author) {
    return;
}
storeEditBook({_id:id, title, author})
}

async function storeEditBook(data){
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify(data)
    }
    await fetch(URL + data._id, option);
    onLoadAllBook();
}

async function onDelete(e){
const id = e.target.dataset.id;
const response =await fetch (URL+id, {method:"DELETE"});
onLoadAllBook();

}
async function saveBook(book){
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify(book)
    }
    const response = await fetch(URL, option);
    onLoadAllBook();
}


async function onLoadAllBook(e) {
    const response = await fetch(URL);
    const data = await response.json();
    Object.entries(data).forEach(([id, obj]) => {
        if (!obj.hasOwnProperty("_id")) {
            return obj._id = id
            
        }
    });
    render(tableTemp(Object.values(data)), rootTable)
}
async function getBookById(id) {
    const response = await fetch(URL + id);
    const data = await response.json();
    return data;
}