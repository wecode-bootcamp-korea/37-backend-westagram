const postDao = require('../models/postDao')

const postUp = async (title, content, userId) => {
  const createPost = await postDao.createPost(
    title,
    content,
    userId
  );

  return createPost;
};

const postList = async () => {
  const showPosts = await postDao.showPosts();

  return showPosts;
};

const postDel = async (postId) => {
  const delPosts = await postDao.delPosts(
    postId
  );

  return delPosts;
};

const postEdit = async (postId, title, content) => {
  const modifyPosts = await postDao.modifyPosts(
    postId,
    title,
    content
  );

  return modifyPosts;
};

module.exports = { postUp, postList, postDel, postEdit }