import { api } from "./requester.js";
import { userUtils } from "../utils/userUtils.js";

const endpoint = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout'
}

async function register(data) { // правим си асинхронна функция за register, приемаща параметър (data)
    const userData = await api.post(endpoint.register, data); // от обекта api, изпълняваме функцията post с параметри endpoint.register и data
    return userUtils.setUser(userData); // изпълняваме функцията setUser от обекта userUtils с параметър userData 
}

async function login(data) { // правим си асинхронна функция за login, приемаща параметър (data)
    const userData = await api.login(endpoint.login, data); // от обекта api, изпълняваме функцията login с параметри endpoint.login и data
    return userUtils.setUser(userData); // изпълняваме функцията setUser от обекта userUtils с параметър userData 
}

async function logout() {  // правим си асинхронна функция за logout, приемаща параметър (data)
    await api.get(endpoint.logout); // от обекта api, изпълняваме функцията get с параметър endpoint.logout
    return userUtils.clear();
}

// Export-ваме обект, съдържащ в себе си направените функции
export const userService = { 
    register,
    login,
    logout
}