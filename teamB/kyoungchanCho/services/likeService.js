const { likeDao } = require('../models');

const createLikes = async (postId, userId) => {
    return await likeDao.createLikes(postId, userId)
};

module.exports = {
    createLikes,
}