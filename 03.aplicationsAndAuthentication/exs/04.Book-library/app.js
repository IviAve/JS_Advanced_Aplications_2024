document.addEventListener('DOMContentLoaded', () => {
    const loadBooksButton = document.getElementById('loadBooks');
    const bookForm = document.querySelector('form');
    const bookList = document.querySelector('tbody');
    const apiUrl = 'http://localhost:3030/jsonstore/collections/books';

    loadBooksButton.addEventListener('click', loadBooks);
    bookForm.addEventListener('submit', handleFormSubmit);

    async function loadBooks() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            bookList.innerHTML = ''; // Clear the list before loading new data

            Object.entries(data).forEach(([id, book]) => {
                const row = document.createElement('tr');

                const titleCell = document.createElement('td');
                titleCell.textContent = book.title;
                row.appendChild(titleCell);

                const authorCell = document.createElement('td');
                authorCell.textContent = book.author;
                row.appendChild(authorCell);

                const actionsCell = document.createElement('td');

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.setAttribute('data-id', id);
                editButton.addEventListener('click', handleEdit);
                actionsCell.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.setAttribute('data-id', id);
                deleteButton.addEventListener('click', handleDelete);
                actionsCell.appendChild(deleteButton);

                row.appendChild(actionsCell);
                bookList.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData(bookForm);
        const title = formData.get('title').trim();
        const author = formData.get('author').trim();
        const bookId = bookForm.getAttribute('data-id');

        if (title === '' || author === '') {
            alert('Both title and author fields are required.');
            return;
        }

        const book = { title, author };

        try {
            let response;
            if (bookId) {
                response = await fetch(`${apiUrl}/${bookId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                });
            } else {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                });
            }

            if (!response.ok) {
                throw new Error('Error saving book');
            }

            loadBooks();
            bookForm.reset();
            bookForm.removeAttribute('data-id');

        } catch (error) {
            console.error('Error saving book:', error);
        }
    }

    function handleEdit(event) {
        const bookId = event.target.getAttribute('data-id');
        const row = event.target.closest('tr');
        const bookTitle = row.querySelector('td:nth-child(1)').textContent;
        const bookAuthor = row.querySelector('td:nth-child(2)').textContent;

        bookForm.setAttribute('data-id', bookId);
        bookForm.querySelector('input[name="title"]').value = bookTitle;
        bookForm.querySelector('input[name="author"]').value = bookAuthor;
    }

    async function handleDelete(event) {
        const bookId = event.target.getAttribute('data-id');

        try {
            const response = await fetch(`${apiUrl}/${bookId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error deleting book');
            }

            loadBooks();

        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
});

console.log('My requests...')