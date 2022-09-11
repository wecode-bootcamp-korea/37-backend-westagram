const postDao = require("../models/postDao");

const writePost = async (title, content, userId2) => {
  const writePost = await postDao.writePost(title, content, userId2);

  return writePost;
};

const getPostsList = async () => {
  return await postDao.getPostsList();
};

const modifyPost = async (title, content, postId) => {
  const modifyPost = postDao.modifyPost(title, content, postId);
  return await modifyPost;
};

const deletePost = async (postId) => {
  const deletePost = postDao.deletePost(postId);
  return await deletePost;
};

module.exports = {
  writePost,
  getPostsList,
  modifyPost,
  deletePost,
};
