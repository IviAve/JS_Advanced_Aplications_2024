// TODO update user service with user identity by project requirements.

import { clearUserData, setUserData } from "../utils.js";
import { post } from "./api.js";

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
}

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    
    setUserData({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken
    });
}

export async function register(email, password) {
    const result = await post(endpoints.register, { email, password });
    
    setUserData({
        _id: result._id,
        email: result.email,
        accessToken: result.accessToken
    });
}

export async function logout() {
    const promise = get(endpoints.logout);
    clearUserData();

    await promise;
}