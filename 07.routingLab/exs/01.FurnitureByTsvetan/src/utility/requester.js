import { userUtil } from "./userUtil.js";

async function requester(method, url, data) {
    const option = {
        method,
        headers: {}
    }

    const userToken = userUtil.getToken();
    if (userToken) {
        option.headers['X-Authorization'] = userToken;
    }

    if (data) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, option);

        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();

    } catch (error) {
        throw new Error(error);
    }
}

async function get(url) {
    return requester('GET', url);
}

async function post(url, data) {
    return requester('POST', url, data)
}

async function put(url, data) {
    return requester('PUT', url, data);
}

async function del(url) {
    return requester('DELETE', url);
}

export const api = {
    get,
    post,
    put,
    del
}