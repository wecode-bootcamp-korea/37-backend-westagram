const userDao = require("../models/userDao");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds); 
}


const signUp = async (name, email, profileImage, password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await makeHash(password, 10);
  console.log(hashedPassword);
  const createUser = await userDao.createUser(
    name,
    email,
    profileImage,
    hashedPassword
  );

  return createUser;
};

const userInfo = async (userId) => {
  const [user, posts] = await userDao.userInfo(userId);
  user.postings = posts;
  return user;
};

const signIn = async (email, password) => {
        
  const user = await userDao.getUserByEmail(email);
  if (!user) {
    const err = new Error("specified user does not exist");
    err.statusCode = 404;
    throw err;
  }
  const result = (password === user.password)

  if (!result) {
    const err = new Error("invalid password");
    err.statusCode = 400;
    throw err;
  }
  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET);
};

module.exports = {
  signUp,
  userInfo,
  signIn
};
