const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("INVALID PASSWORD");
    err.statusCode = 400;
    throw err;
  }
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
