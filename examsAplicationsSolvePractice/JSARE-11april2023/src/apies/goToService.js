import { get, post } from "./api.js";
import { getUserData } from '../utils.js';

const endPoints = {
    addGoTo: '/data/going',
    goToById: (eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    goToByUser: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function postGoTo(data) {
    return await post(endPoints.addGoTo, data);
}

export async function getGoToById(id) {
    const userData = getUserData();

    const requests = [
        get(endPoints.goToById(id))
    ];

    if (userData) {
        requests.push(get(endPoints.goToByUser(id, userData._id)));
    }

    const [goTo, hasGoTo] = await Promise.all(requests);
    
    return { goTo, hasGoTo: Boolean(hasGoTo)};
}

export async function getGoToByUser(eventId, userId) {
    return await get(endPoints.goToByUser(eventId, userId))
}