// TODO update user service with user identity by project requirements.

import { clearUserData, setUserData } from "../utils.js";
import { get,post } from "./api.js";

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export let userDataBase = []; // ново - това е датаБейз с юзерите

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    
    setUserData(result); // различното - така вземам всичко от респонса а не само id, email и token
}



export async function register(username, email, password, gender) {
    const result = await post(endpoints.register, { username, email, password });

    userDataBase.push({username, email, gender}); // сетвам датаБейз
    
    setUserData(result); // различното - така вземам всичко от респонса а не само id, email и token
    
}

export async function logout() {
    const promise = get(endpoints.logout);
    clearUserData();

    await promise;
}
