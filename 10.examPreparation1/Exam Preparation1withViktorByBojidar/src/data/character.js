import { get, post, put, del } from "./api.js";

const endpoints = {
    'catalog': '/data/characters?sortBy=_createdOn%20desc',
    'characterById': '/data/characters/',
    'characters': '/data/characters'
}

export async function getAllCharacters() {
    return get(endpoints.catalog);
}

export async function getCharacterById(id) {
    return get(endpoints.characterById + id);
}

export async function createCharacter(category, imageUrl, description, moreInfo) {
    return post(endpoints.characters, {
        category, 
        imageUrl, 
        description, 
        moreInfo
    });
}

export async function updateCharacter(id, characterData) {
    return put(endpoints.characterById + id, characterData);
}

export async function deleteCharacter(id) {
    return del(endpoints.characterById + id);
}