// Функцията requester приема като параметри: 
    // method - метода на request-а 
    // endpoint - локацията на request-а 
    // data (optional) - само, когато правим post/put заявки

import { userUtils } from "../utils/userUtils.js";

async function requester(method, endpoint, data) {
    const userData = userUtils.getUser(); // повикваме функцията getUser от обекта userUtils и взимаме userData
    const option = {
        method,
        headers: {}
    }

    if (userData) { // Ако в sessionStorage имаме userData
        option.headers['X-Authorization'] = userData.accessToken; // към header-ите в option-а прибави 'X-Authorization'
    }

    if (data) { // ако има данни
        option.headers['Content-Type'] =  'application/json'; // към option-а добави съответните header-и
        option.body = JSON.stringify(data); // към option-а добави съответното body
    }

    try {

        const response = await fetch(endpoint, option); // направи заявка към дадения endpoint с дадения option

        if (!response.ok) { // ако response-а не е ок
            
            if (response.status === 403) { // ако има нещо нередно с данните
                userUtils.clear(); // clear-ваме userUtils
            }

            const error = await response.json(); // във всички случаи, в които имаме грешка, взимаме грешката от response-а
            throw new Error(error.message); // и я хвърляме
        }

        if (response.status === 204) { // ако response statusa е 204
            return response; // върни response-а
        }
    
        return response.json(); // ако всичко е наред връщаме резултата от response-а

    } catch (error) {

        alert(error);
    }

}

// Ще направим така, че requster-а да се вика през определени функции:

async function get(endpoint) { // правим асинхронна функция за GET, която:
    return requester('GET', endpoint) // връща резултата от функцията requster, изпълнена с дадените параметри
}

async function post(endpoint, data) { // правим асинхронна функция за POST , която:
    return requester('POST', endpoint, data) // връща резултата от функцията requster, изпълнена с дадените параметри
}

async function put(endpoint, data) { // правим асинхронна функцияза PUT, която:
    return requester('PUT', endpoint, data) // връща резултата от функцията requster, изпълнена с дадените параметри
}

async function del(endpoint) { // правим асинхронна функция за DELETE, която:
    return requester('DELETE', endpoint) // връща резултата от функцията requster, изпълнена с дадените параметри
}

// Export-ваме всички направени функции в един обект:
export const api = {
    get,
    post,
    put,
    del
}