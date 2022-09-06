const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {
  // password validation using REGEX
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error(
      "비밀번호는 영어,숫자,특수문자를 포함해 8-20자로 만들어주세요"
    );
    err.statusCode = 409;
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
