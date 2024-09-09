import { get, post } from "./api.js";
import { getUserData } from '../utils.js';

const endPoints = {
    addDonate: '/data/donation',
    donateById: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    donateByUser: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function postDonate(data) {
    return await post(endPoints.addDonate, data);
}

export async function getDonateById(id) {
    const userData = getUserData();

    const requests = [
        get(endPoints.donateById(id))
    ];

    if (userData) {
        requests.push(get(endPoints.donateByUser(id, userData._id)));
    }

    const [donates, hasDonate] = await Promise.all(requests);
     
    
    return { donates, hasDonate: Boolean(hasDonate)};
}

export async function getDonateByUser(petId, userId) {
    return await get(endPoints.donateByUser(petId, userId))
}