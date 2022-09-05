const postDao = require("../models/postDao");

const writePost = async (title, content, userId) => {
  const titleAndContent = await postDao.titleAndContent(title, content, userId);
  return titleAndContent;
};

const postsList = async () => {
  return await postDao.allPosts();
};

const modifyPost = async (title, content, postId) => {
  const modify = postDao.modify(title, content, postId);
  return await modify;
}

module.exports = {
  writePost,
  postsList,
  modifyPost,
  };
