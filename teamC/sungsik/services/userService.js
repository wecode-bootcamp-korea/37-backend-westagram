const userDao = require("../models/userDao");

const signUp = async (name, email, profileImage, password) => {
    const checkOverlap = await userDao.checkOverlap(email);

    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
        
    if ( !email.includes('@')) {
        const err = new Error('EMAIL_INVALID')
        err.statusCode = 400;
        throw err;
    }

    if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 400;
        throw err;
    }
    
    if (checkOverlap.length !== 0) {
        const err = new Error("USER_OVERLAPED");
        err.statusCode = 400;
        throw err;
    }
    
    const createUser = await userDao.createUser(
        name,
        email,
        profileImage,
        password
    );
};

module.exports = {
    signUp
}