import { api } from "./requester.js";

// Взимаме си всички endpoints:
const endpoint = {
    getAll: 'http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    create: 'http://localhost:3030/data/ideas',
    getById: 'http://localhost:3030/data/ideas/',
    deleteById: 'http://localhost:3030/data/ideas'
}


// Правим асинхронна функция getAllIdea, която:
async function getAllIdea() {
    return await api.get(endpoint.getAll); // изпълнява функцията get от обекта api с параметър endpoint.getAll
}

// Правим асинхронна функция createIdea, която:
async function createIdea(data) { // приема data параметър
    return await api.post(endpoint.create); // изпълнява функцията post от обекта api с параметър endpoint.create
}

// Правим асинхронна функция details, която:
async function details(id) { // приема id параметър
    return await api.get(endpoint.getById + id); // изпълнява функцията get от обекта api с параметър endpoint.getById
}

// Правим асинхронна функция deleteById, която:
async function deleteById(id) { // приема id параметър
    return await api.del(endpoint.deleteById + id) // изпълнява функцията del от обекта api с параметър endpoint.deleteById
}

// Правим обект dataService, който ще съхранява всички направени функции в себе си:
export const dataService = {
    getAllIdea,
    createIdea,
    details,
    deleteById
}