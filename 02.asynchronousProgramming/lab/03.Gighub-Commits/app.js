async function loadCommits() {
    // Try it with Fetch API

    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    // Get the commits list element
    const commitsList = document.getElementById('commits');

    // Clear the contents of the list
    commitsList.innerHTML = '';

    try {
        // Perform the fetch request
        const response = await fetch(url);

        // Check if the response is not ok (e.g., 404 Not Found)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} (Not Found)`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Iterate over the commits and create list items
        data.forEach(commit => {
            const listItem = document.createElement('li');
            listItem.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            commitsList.appendChild(listItem);
        });
    } catch (error) {
        // Append a list item with the error message
        const listItem = document.createElement('li');
        listItem.textContent = error.message;
        commitsList.appendChild(listItem);
    }
    //console.log('TODO...');
}