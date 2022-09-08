const likeDao = require("../models/likeDao");

const likePost = async (postId, userId) => {
  const likePost = await likeDao.likePost(postId, userId);
  return likePost;
};

module.exports = {
  likePost,
};
