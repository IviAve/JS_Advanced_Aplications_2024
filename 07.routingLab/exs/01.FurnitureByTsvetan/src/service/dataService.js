import { api } from '../utility/requester.js';

const endPoints = {
    baseCatalog: 'http://localhost:3030/data/catalog',
    baseDetails: 'http://localhost:3030/data/catalog/',
    myFurniture: (id) => `http://localhost:3030/data/catalog?where=_ownerId%3D%22${id}%22`
}

async function getAllFurniture() {
    return await api.get(endPoints.baseCatalog);
}

async function createFurniture(data) {
    return await api.post(endPoints.baseCatalog, data);
}

async function getDetailsFurniture(id) {
    return await api.get(endPoints.baseDetails + id);
}

async function updateFurniture(id, data) {
    return await api.put(endPoints.baseDetails + id, data);
}

async function delFurniture(id) {
    return await api.del(endPoints.baseDetails + id);
}

async function getMyFurniture(userId) {
    return await api.get(endPoints.myFurniture(userId));
}

export const dataService = {
    getAllFurniture,
    createFurniture,
    getDetailsFurniture,
    updateFurniture,
    delFurniture,
    getMyFurniture
}