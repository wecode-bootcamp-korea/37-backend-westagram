const postDao = require("../models/postDao");

const writePost = async (title, content, userId) => {
  const titleAndContent = await postDao.titleAndContent(title, content, userId);
  return titleAndContent;
};

const postsList = async () => {
  return await postDao.allPosts();
};

module.exports = {
  writePost,
  postsList,
};
