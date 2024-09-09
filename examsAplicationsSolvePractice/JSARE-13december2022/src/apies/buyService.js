import { get, post } from "./api.js";
import { getUserData } from '../utils.js';

const endPoints = {
    addBuy: '/data/bought',
    buyById: (productId) => `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    buyByUser: (productId, userId) => `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function postBuy(data) {
    return await post(endPoints.addBuy, data);
}

export async function getBuyById(id) {
    const userData = getUserData();

    const requests = [
        get(endPoints.buyById(id))
    ];

    if (userData) {
        requests.push(get(endPoints.buyByUser(id, userData._id)));
    }

    const [buy, hasBuy] = await Promise.all(requests);
    
    return { buy, hasBuy: Boolean(hasBuy)};
}

export async function getBuyByUser(productId, userId) {
    return await get(endPoints.buyByUser(productId, userId))
}