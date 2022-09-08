const { postDao } = require('../models')

const postPost = async (title, content, userId) => {
    return await postDao.postPost(title, content, userId);
}

const getPosts = async () => {
    return await postDao.getPosts();
}

const getPostsByUser = async ( userId ) => {
    return await postDao.getPostsByUser(userId);
}

const patchPost = async (title, postId) => {
    return await postDao.patchPost(title, postId);
}

const afterPatchPost = async (postId) => {
    return await postDao.afterPatchPost(postId)
}

const deletePost = async (postId) => {
    return await postDao.deletePost(postId)
}

module.exports = {
    postPost,
    getPosts,
    getPostsByUser,
    patchPost,
    afterPatchPost,
    deletePost,
}