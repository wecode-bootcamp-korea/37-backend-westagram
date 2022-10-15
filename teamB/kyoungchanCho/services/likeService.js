const { likeDao } = require('../models');

const postLikes = async (postId, userId) => {
    return await likeDao.postLikes(postId, userId)
};

module.exports = {
    postLikes,
}