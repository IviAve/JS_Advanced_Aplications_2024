import { get, post } from "./api.js";
import { getUserData } from '../utils.js';

const endPoints = {
    addLike: '/data/likes',
    likesById: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    likesByUser: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function postLike(data) {
    return await post(endPoints.addLike, data);
}

export async function getLikesById(id) {
    const userData = getUserData();

    const requests = [
        get(endPoints.likesById(id))
    ];

    if (userData) {
        requests.push(get(endPoints.likesByUser(id, userData._id)));
    }

    const [likes, hasLiked] = await Promise.all(requests);
    
    return { likes, hasLiked: Boolean(hasLiked)};
}

export async function getLikesByUser(factId, userId) {
    return await get(endPoints.likesByUser(factId, userId))
}