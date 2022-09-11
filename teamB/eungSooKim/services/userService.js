const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userDao = require("../models/userDao");
const { validatePassword, validateEmail } = require("../utils/validators");

const signUp = async (name, email, password, profileImage) => {
  validatePassword(password);
  validateEmail(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const signUp = await userDao.signUp(
    name,
    email,
    hashedPassword,
    profileImage
  );
  console.log(await signUp);
  return signUp;
};

const signIn = async (email, password) => {
  const [user] = await userDao.signIn(email);
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    const err = new Error("invalid password");
    err.statusCode = 400;
    throw err;
  }
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET
  );
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
  signIn,
  getUserPosts,
  getPostsUser,
};
