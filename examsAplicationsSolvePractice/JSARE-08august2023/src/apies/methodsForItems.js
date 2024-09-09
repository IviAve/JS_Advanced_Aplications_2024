//methods for items,in this problem are cars,need to rename for other type items

import { get, post, put, del } from "./api.js";

const endpoints = {
    allMotorcycles: "/data/motorcycles?sortBy=_createdOn%20desc", // from word document url
    motorcycles: "/data/motorcycles" // from word document url
}

export async function getAllItems() {
    return await get(endpoints.allMotorcycles);

}

export async function createCar(data) {
    return await post(endpoints.motorcycles, data);
}
export async function getCarById(id) {
    return await get(endpoints.motorcycles + `/${id}`);

}

export async function updateCar(id, data) {
    return await put(endpoints.motorcycles + `/${id}`, data);
}
export async function deleteCar(id) {
    return await del(endpoints.motorcycles + `/${id}`);

}
export async function searchCar(query) {
    return await get(`${endpoints.motorcycles}?where=model%20LIKE%20%22${query}%22`)
}


