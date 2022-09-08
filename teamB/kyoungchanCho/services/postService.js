const { postDao } = require('../models')

const writePost = async (title, content, userId) => {
    return await postDao.createPost(title, content, userId);
}

const getPosts = async () => {
    return await postDao.lookPosts();
}

const getPostsByUser = async ( userId ) => {
    return await postDao.lookPostsByUser(userId);
}

const patchPost = async (title, postId) => {
    return await postDao.updatePost(title, postId);
}

const afterPatchPost = async (postId) => {
    return await postDao.afterUpdatePost(postId)
}

const deletePost = async (postId) => {
    return await postDao.removePost(postId)
}

module.exports = {
    writePost,
    getPosts,
    getPostsByUser,
    patchPost,
    afterPatchPost,
    deletePost,
}