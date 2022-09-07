const { postDao } = require('../models')

const writePost = async (title, content, userId) => {
    return await postDao.createPost(title, content, userId);
}

const getPosts = async () => {
    return await postDao.lookPosts();
}

const getPostsByUser = async () => {
    return await postDao.lookPostsByUser();
}

module.exports = {
    writePost,
    getPosts,
    getPostsByUser,
}