//실제 로직이 돌아가는 파일

const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const createUser = await userDao.createUser(
        name,
        email,
        password,
        profileImage
    );

    return createUser;
};

module.exports = {
    signUp
}