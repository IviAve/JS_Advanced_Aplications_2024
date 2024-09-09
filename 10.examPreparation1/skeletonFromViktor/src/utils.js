export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getUserData(){
    return JSON.parse(localStorage.getItem('user'));
}


export function clearUserData(){
    return localStorage.removetItem('user');
}

export function createSubmitHandler(callback) {
    return function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        callback(data, event.target)
    }
}
