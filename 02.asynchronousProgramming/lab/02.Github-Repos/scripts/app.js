async function loadRepos() {

	// Get the username from the input field
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}/repos`;

    // Get the repos list element
    const reposList = document.getElementById('repos');

    // Clear the contents of the list
    reposList.innerHTML = '';

    try {
        // Perform the fetch request
        const response = await fetch(url);

        // Check if the response is not ok (e.g., 404 Not Found)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Iterate over the repositories and create list items
        data.forEach(repo => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = repo.html_url;
            link.textContent = repo.full_name;
            listItem.appendChild(link);
            reposList.appendChild(listItem);
        });
    } catch (error) {
        // Append a list item with the error message
        const listItem = document.createElement('li');
        listItem.textContent = error.message;
        reposList.appendChild(listItem);
    }
	//console.log("TODO...");
}