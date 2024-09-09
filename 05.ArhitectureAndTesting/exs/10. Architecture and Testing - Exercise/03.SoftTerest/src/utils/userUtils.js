// Правим функция setUser, която ще приема параметър data и ще запазва userData в sessionStorage-а.
function setUser(data) { 
    sessionStorage.setItem("userData", JSON.stringify(data)); //
}

// Правим функция getUser, която ще взима userData от sessionStorage.
function getUser() {
    return JSON.parse(sessionStorage.getItem("userData"));
}

// Правим функция getUserId, която ще взима _id от резултата от функцията getUser.
function getUserId() {
    const userData = getUser();
    return userData._id
}

// Правим функция clear, която ще премахва userData-та.
function clear() {
    sessionStorage.removeItem("userData");
}

// За да export-нем всички функции на един път, правим обект, съдържащ в себе си всички тях:
export const userUtils = {
    setUser,
    getUser,
    getUserId,
    clear
}