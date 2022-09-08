const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require('../models/userDao');


const signUp = async (name, email, password, profileImage) => {
    // password validation using REGEX
    const pwValidation = new RegExp(
      '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 400;
      throw err;
    }

    const saltRounds = 10;

    // bcrypt 함수 선언!
    const makeHash = async (password, saltRounds) => {
      return await bcrypt.hash(password, saltRounds);
    }

    //bcrypt 함수 실행!
    const hashPassword = await makeHash(password,saltRounds);

    const createUser = await userDao.createUser( name, email, hashPassword, profileImage );
      
    return createUser;
};

const signIn = async (email, password) => {

  const user = await userDao.checkUser( email );

  if (!user) {
    const err = new Error('specified user does not exist');
    err.statusCode = 404;
    throw err;
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    const err = new Error('invalid password');
    err.statusCode = 400;
    throw err;
  }

  const secretKey = 'mySecretKey';
  const jwtToken = jwt.sign({ sub: user.id, email: user.email} , secretKey);

  return jwtToken;
};

  
  module.exports = {
      signUp, signIn
  }