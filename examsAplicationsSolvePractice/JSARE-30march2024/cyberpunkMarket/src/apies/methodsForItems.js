//methods for items,in this problem are cars,need to rename for other type items

import { get, post, put, del } from "./api.js";

const endpoints = {
    allItems: "/data/cyberpunk?sortBy=_createdOn%20desc", // from word document url
    items: "/data/cyberpunk" // from word document url
}

export async function getAllItems() {
    return await get(endpoints.allItems);

}

export async function createItem(data) {
    return await post(endpoints.items, data);
}
export async function getItemById(id) {
    return await get(endpoints.items + `/${id}`);

}

export async function updateItem(id, data) {
    return await put(endpoints.items + `/${id}`, data);
}
export async function deleteItem(id) {
    return await del(endpoints.items + `/${id}`);

}
// export async function searchCar(query) {
//     return await get(`${endpoints.items}?where=model%20LIKE%20%22${query}%22`)
// }


