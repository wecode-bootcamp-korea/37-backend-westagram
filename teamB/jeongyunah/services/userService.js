const userDao = require('../models/userDao')
const bcrypt = require ("bcrypt");

const createUser = async (name, email, password, profileImage) => {
    // password validation using REGEX
    const pwValidation = new RegExp(
      '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
    }
    
    const saltRounds = 8;
    const makeHash = async(password, saltRounds) => {
      return await bcrypt.hash(password, saltRounds);
    }
    const hashPassword = await makeHash(password, saltRounds);
    const createUser = await userDao.createUser(
          name,
          email,
          hashPassword,
          profileImage
        );
        return createUser;
}


module.exports = {
  createUser
};
