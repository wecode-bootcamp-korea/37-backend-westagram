const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { userDao } = require("../models/");
const { validation } =require("../utils/validators")

const getUserSignUp = async (
  first_name,
  last_name,
  age,
  email,
  password,
  profile_image
) => {
  validation(email, password);

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

const getUserInfoWithPostings = async (userId) => {
  const userInfo = await userDao.getUserIdImage(userId);
  userInfo.postings = await userDao.getUserPosting(userId);
  return userInfo;
};

const getUserSignIn = async (email, password) => {
  const [user] = await userDao.checkUserEmail(email);
  
  if (!user) {
    const err = new Error("Invalid mail address");
    err.statusCode = 404;
    throw err;
  }
  
  const checkHash = async (password, hashedPw) => await bcrypt.compare(password, hashedPw);
  
  const comparePw = await checkHash(password, user.password);
  
  if (!comparePw) {
    const err = new Error("PASSWORD_CONFLICT");
    err.statusCode = 409;
    throw err;
  }

  validation(email, password);

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

module.exports = {
  getUserSignUp,
  getUserSignIn,
  getUserInfoWithPostings,
};
