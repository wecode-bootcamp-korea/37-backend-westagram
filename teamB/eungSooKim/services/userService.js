const userDao = require("../models/userDao");
const { validatePassword, validateEmail } = require("../utils/validators");

const signUp = async (name, email, password, profileImage) => {
  validatePassword(password);
  validateEmail(email);
  const signUp = await userDao.signUp(name, email, password, profileImage);
  return signUp;
};

const getUserPosts = async (userId) => {
  const userPosts = await userDao.getUserPosts(userId);
  return userPosts;
};

const getPostsUser = async (userId) => {
  const postsUser = await userDao.getPostsUser(userId);
  return postsUser;
};

module.exports = {
  signUp,
  getUserPosts,
  getPostsUser,
};
