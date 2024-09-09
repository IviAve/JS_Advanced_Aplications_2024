function loadRepos() {

   const xhr = new XMLHttpRequest();

    // Define the URL for the GET request
    const url = "https://api.github.com/users/testnakov/repos";

    // Set up the onreadystatechange event handler
    xhr.onreadystatechange = function () {
        // Check if the request is complete (readyState === 4)
        if (xhr.readyState === 4) {
            // Get the div element with id 'res'
            const resDiv = document.getElementById('res');

            // Replace the text content of the div with the responseText
            resDiv.textContent = xhr.responseText;
        }
    };

    // Initialize the request
    xhr.open('GET', url, true);

    // Send the request
    xhr.send();
   //console.log("TODO...");
}