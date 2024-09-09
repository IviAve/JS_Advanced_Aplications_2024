import { get, post } from "./api.js";
import { getUserData } from '../utils.js';

const endPoints = {
    addApply: '/data/applications',
    applyById: (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    applyByUser: (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function postApply(data) {
    return await post(endPoints.addApply, data);
}

export async function getApplyById(id) {
    const userData = getUserData();

    const requests = [
        get(endPoints.applyById(id))
    ];

    if (userData) {
        requests.push(get(endPoints.applyByUser(id, userData._id)));
    }

    const [applies, hasApply] = await Promise.all(requests);
    
    return { applies, hasApply: Boolean(hasApply)};
}

export async function getApplyByUser(offerId, userId) {
    return await get(endPoints.applyByUser(offerId, userId))
}