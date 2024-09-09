import { get, post } from "./api.js";
import { getUserData } from '../utils.js';

const endPoints = {
    addLike: '/data/likes',
    likesById: (solutionId) => `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    likesByUser: (solutionId, userId) => `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

export async function getLikesByUser(solutionId, userId) {
    return await get(endPoints.likesByUser(solutionId, userId))
}