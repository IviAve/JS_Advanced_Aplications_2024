import { get, post } from './api.js';

const endpoints = {
    comment: '/data/comments',
    commentsByGameId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`
}

export async function commentGame(gameId, comment) {
    return post(endpoints.comment, {
        gameId, comment
    });
}

export async function getCommentsByGameId(gameId) {
    return get(endpoints.commentsByGameId(gameId));
}