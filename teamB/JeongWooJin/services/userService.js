const userDao = require('../models/userDao')

const signUp = async (name, email, profile_image, password) => {
    // password validation using REGEX
    const pwValidation = new RegExp(
      '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
    }
      const createUser = await userDao.createUser(
          name,
          email,
          profile_image,
          password          
        );
      
        return createUser;
      };
  
    const userInfo = async (userId) => {
      const [user, posts] = await userDao.userInfo(userId);
      user.postings = posts
      return user;
      };

  module.exports = {
      signUp, userInfo
  }