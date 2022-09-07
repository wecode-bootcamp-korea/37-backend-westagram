const likeDao = require('../models/likeDao')

const postLike = async (userId, postId) => {
  const createLike = await likeDao.createLike(
    userId,
    postId
  );

  return createLike;
};

module.exports = { postLike }