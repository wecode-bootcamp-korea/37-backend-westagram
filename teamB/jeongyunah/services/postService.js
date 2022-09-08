const postDao = require("../models/postDao");

const createPost = async (title, content, user_id) => {
  const createPost = await postDao.createPost(title, content, user_id);
  return createPost;
};

const getPostList = async () => {
  const getPostList = await postDao.getPostList();
  return getPostList;
};

const getUserPostList = async (user_id) => {
  const [dataUsers, dataPosts] = await postDao.getUserPostList(user_id);
  dataUsers[0].postings = dataPosts;
  return dataUsers[0];
};

const modifyPost = async (post_id, content) => {
  const modifyPost = await postDao.modifyPost(post_id, content);
  return modifyPost;
};

const removePost = async (post_id) => {
  const removePost = await postDao.removePost(post_id);
  return removePost;
};

module.exports = {
    createPost,
    getPostList,
    getUserPostList,
    modifyPost,
    removePost
};
