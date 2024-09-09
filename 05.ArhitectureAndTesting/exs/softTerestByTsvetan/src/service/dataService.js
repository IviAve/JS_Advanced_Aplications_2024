import { api } from '../utility/requester.js';

const endPoints = {
    allIdeas: 'http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    create: 'http://localhost:3030/data/ideas',
    byId: 'http://localhost:3030/data/ideas/'
}

async function getAllIdeas() {
    return await api.get(endPoints.allIdeas);
}

async function createIdea(data) {
    return await api.post(endPoints.create, data);
}

async function getDetails(id) {
    return await api.get(endPoints.byId + id);
}

// async function updateFurniture(id, data) {
//     return await api.put(endPoints.baseDetails + id, data);
// }

async function delIdea(id) {
    return await api.del(endPoints.byId + id);
}

// async function getMyFurniture(userId) {
//     return await api.get(endPoints.myFurniture(userId));
// }

export const dataService = {
    getAllIdeas,
    getDetails,
    createIdea,
    delIdea
    // updateFurniture,
    // getMyFurniture
}