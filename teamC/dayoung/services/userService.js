const userDao = require('../models/userDao')

const signUp = async (email, password) => {
    // password validation using REGEX
    const pwValidation = new RegExp(
      '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 400;
      throw err;
    }
    const createUser = await userDao.createUser( email, password );
      
    return createUser;
};
  
  module.exports = {
      signUp
  }