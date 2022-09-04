 const userDao = require('../models/userDao');

 const signUp = async(name, email, password, profileImage) =>{
    const pwValidation = new RegExp( '/^[a-z0-9_]{4,20}$/');


    if(!pwValidation.test(password)){
     const err = newError('PASSWORD_IS_NOT_VALID');
     err.statusCode = 400;
     throw err;
    }
    const createUser = await userDao.createUser(
        name,
        email,
        password,
        profileImage
    );

    return createUser;
 };

 module.exports = {signUp};