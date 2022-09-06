const postDao = require("../models/postDao");

const writePost = async (title, content, userId) => {
  const writePost = await postDao.writePost(title, content, userId);
  return writePost;
};

const postsList = async () => {
  return await postDao.postsList();
};

const modifyPost = async (title, content, postId) => {
  const modify = postDao.modifyPost(title, content, postId);
  return await modify;
};

const delPost = async (postId) => {
  const delPost = postDao.delPost(postId);
  return await delPost;
};

module.exports = {
  writePost,
  postsList,
  modifyPost,
  delPost,
};
