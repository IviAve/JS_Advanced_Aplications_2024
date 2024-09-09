import { get, post } from './api.js';
import { getUserData } from '../utils.js';

const endpoints = {
    like: '/data/useful',
    likesByCharacterId: (id) => `/data/useful?where=characterId%3D%22${id}%22&distinct=_ownerId&count`,
    likesByUserId: (characterId, userId) => `/data/useful?where=characterId%3d%22${characterId}%22%20and%20_ownerId%3d%22${userId}%22&count`
}

export async function likeCharacter(characterId) {
    return await post(endpoints.like, { characterId });
}

export async function getLikesByCharactedId(characterId) {
    const userData = getUserData();

    const requests = [
        get(endpoints.likesByCharacterId(characterId))
    ];

    if (userData) {
        requests.push(get(endpoints.likesByUserId(characterId, userData._id)));
    }

    const [likes, hasLiked] = await Promise.all(requests);

    return {
        likes,
        hasLiked: Boolean(hasLiked)
    }
}