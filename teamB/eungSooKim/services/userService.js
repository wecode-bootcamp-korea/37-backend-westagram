const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error(
      "INVALID PASSWORD"
    );
    err.statusCode = 400;
    throw err;
  }
  const signUp = await userDao.signUp(
    name,
    email,
    password,
    profileImage
  );
  return signUp;
};

const userPosts = async (userId) => {
  const userPosts = await userDao.userPosts(userId);

  return userPosts;
};

module.exports = {
  signUp,
  userPosts,
};
