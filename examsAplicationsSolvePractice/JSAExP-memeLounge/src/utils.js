export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getUserData(){
    return JSON.parse(localStorage.getItem('user'));
}


export function clearUserData(){
     localStorage.removeItem('user');
}

export function createSubmitHandler(callback) {
    return function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        callback(data, event.target);
    };
}
// navigationBar  may be to remove in navigationBar.js
const  userNav = document.querySelector('nav .user')
const  guestNav = document.querySelector('nav .guest')
const emailSpan = document.getElementById('welcome')

export function updateNav(){

    const userData = getUserData();
    if (userData) {
        userNav.style.display = "inline-block"
        guestNav.style.display = "none"
        emailSpan.textContent = `Welcome, ${userData.email}`
        
    }else{
        guestNav.style.display = "inline-block"
        userNav.style.display = "none"
    }
}

export function hasOwner(ownerId){
    const userData = getUserData()
    return ownerId === userData?._id;
}