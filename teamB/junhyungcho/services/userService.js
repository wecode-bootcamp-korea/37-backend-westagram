const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { userDao } = require("../models/");

const signUp = async (
  first_name,
  last_name,
  age,
  email,
  password,
  profile_image
) => {
  const mailValidation = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );

  const pwValidation = new RegExp(
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/
  );

  if (!pwValidation(password) || mailValidation(email)) {
    const err = new Error("invalid email");
    err.statusCode = 400;
    throw err;
  }

  const saltRounds = 10;
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const hashedPw = await makeHash(password, saltRounds);
  return await userDao.createUser(
    first_name,
    last_name,
    age,
    email,
    hashedPw,
    profile_image
  );
};

const signIn = async (email, password) => {
  const [user] = await userDao.getUserSignIn(email);

  if (!user) {
    const err = new Error("specified user does not exist");
    err.statusCode = 404;
    throw err;
  }

  console.log(user.password);

  const checkHash = async (password, hashedPw) => {
    return await bcrypt.compare(password, hashedPw);
  };

  const comparePw = await checkHash(password, user.password);

  if (!comparePw) {
    const err = new Error("invalid password");
    err.statusCode = 400;
    throw err;
  }

  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET);
};

const inquireUserInfo = async (userId) => {
  const userInfo = await userDao.getUserIdImage(userId);
  userInfo.postings = await userDao.getUserPosting(userId);
  return userInfo;
};

module.exports = {
  signUp,
  inquireUserInfo,
  signIn,
};
