//methods for items,in this problem are cars,need to rename for other type items

import { get, post, put, del } from "./api.js";

const endpoints = {
    allCars: "/data/cars?sortBy=_createdOn%20desc", // from word document url
    cars: "/data/cars" // from word document url
}

export async function getAllCars() {
    return await get(endpoints.allCars);

}

export async function createCar(data) {
    return await post(endpoints.cars, data);
}
export async function getCarById(id) {
    return await get(endpoints.cars + `/${id}`);

}

export async function updateCar(id, data) {
    return await put(endpoints.cars + `/${id}`, data);
}
export async function deleteCar(id) {
    return await del(endpoints.cars + `/${id}`);

}
export async function searchCar(query) {
    return await get(`${endpoints.cars}?where=model%20LIKE%20%22${query}%22`)
}


