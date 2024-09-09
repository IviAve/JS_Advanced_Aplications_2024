function lockedProfile() {
 
    async function fetchProfiles() {
        const main = document.getElementById('main');
        //main.innerHTML = '';
        const profilDivOld = main.getElementsByClassName('profile')[0]; // new
        // try {
            const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
            const data = await response.json();
 
            Object.values(data).forEach((user) => {
                let profileDiv = profilDivOld.cloneNode(true);
                profilDivOld.remove();
                
                //profileDiv.className = 'profile';
 
                profileDiv.innerHTML = `
                    <img src="./iconProfile2.png" class="userIcon" />
                    <label>Lock</label>
                    <input type="radio" name="user1Locked" value="lock" checked>
                    <label>Unlock</label>
                    <input type="radio" name="user1Locked" value="unlock"><br>
                    <hr>
                    <label>Username</label>
                    <input type="text" name="user1Username" value="${user.username}" disabled readonly />
                    <div id="user1HiddenFields">
                        <hr>
                        <label>Email:</label>
                        <input type="email" name="user1Email" value="${user.email}" disabled readonly />
                        <label>Age:</label>
                        <input type="email" name="user1Age" value="${user.age}" disabled readonly />
                    </div>
                    <button>Show more</button>
                `;
 
                const button = profileDiv.querySelector('button');
                const hiddenInfoDiv = profileDiv.querySelector(`#user1HiddenFields`);
                hiddenInfoDiv.style.display = 'none';
                //const lockRadio = profileDiv.querySelector(`input[name="user1Locked"][value="lock"]`);
                const unlockRadio = profileDiv.querySelector(`input[name="user1Locked"][value="unlock"]`);
 
                button.addEventListener('click', () => {
                    if (unlockRadio.checked) {
                        if (button.textContent === 'Show more') {
                            hiddenInfoDiv.style.display = 'block';
                            button.textContent = 'Hide it';
                        } else {
                            hiddenInfoDiv.style.display = 'none';
                            button.textContent = 'Show more';
                        }
                    }
                });
 
               
 
                main.appendChild(profileDiv);
            });
       
    }
 
    window.addEventListener('load', fetchProfiles);
}