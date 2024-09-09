const loadButton = document.getElementById('load');
loadButton.addEventListener('click', loadCatches);

const catchesDiv = document.getElementById('catches');

const authToken = sessionStorage.getItem('authToken');
const userId = sessionStorage.getItem('userId');

async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Request failed.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Function to handle updating a catch
async function updateCatch(catchId, newData) {
    const url = `http://localhost:3030/data/catches/${catchId}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(newData)
    };

    try {
        const data = await fetchData(url, options);
        // Handle response as needed
        console.log('Updated catch:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Function to handle deleting a catch
async function deleteCatch(catchId) {
    const url = `http://localhost:3030/data/catches/${catchId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'X-Authorization': localStorage.getItem('accessToken')
        }
    };

    try {
        const data = await fetchData(url, options);
        // Handle response as needed
        console.log('Deleted catch:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage of updateCatch and deleteCatch functions
document.addEventListener('DOMContentLoaded', () => {
    const updateButtons = document.querySelectorAll('.update');
    if (updateButtons) {
        updateButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const catchId = button.dataset.id;
                // Example: Get data from inputs
                const angler = button.parentElement.querySelector('.angler').value.trim();
                const weight = parseFloat(button.parentElement.querySelector('.weight').value.trim());
                const species = button.parentElement.querySelector('.species').value.trim();
                const location = button.parentElement.querySelector('.location').value.trim();
                const bait = button.parentElement.querySelector('.bait').value.trim();
                const captureTime = parseInt(button.parentElement.querySelector('.captureTime').value.trim());

                // Example: Update the catch
                await updateCatch(catchId, { angler, weight, species, location, bait, captureTime });
            });
        });
    }

    const deleteButtons = document.querySelectorAll('.delete');
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const catchId = button.dataset.id;
                // Example: Delete the catch
                await deleteCatch(catchId);
            });
        });
    }
});


console.log('TODO:// Implement Home functionality');