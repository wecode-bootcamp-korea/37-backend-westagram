const userDao = require("../models/userDao");
const validator = require('../utils/validators')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (name, email, profileImage, password) => {
    const checkOverlap = await userDao.checkOverlap(email);

    validator.validateEmail(email)
    validator.validatePw(password)
    
    if (checkOverlap) {
        const err = new Error("USER_OVERLAPED");
        err.statusCode = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await userDao.createUser(
        name,
        email,
        profileImage,
        hashedPassword
    );
};

const signIn = async ( email, password ) => {
    const checkOverlap = await userDao.checkOverlap(email);
    
    if (!checkOverlap) {
        const err = new Error("Account does not exsist");
        err.statusCode = 400;
        throw err;
    }

    const result = await bcrypt.compare(password, checkOverlap.password);

    if (!result) {
        const error = new Error('INVALID_PASSWORD')
        error.statusCode = 400;
        throw error;
    }

    return jwt.sign({ sub:checkOverlap.id, email:checkOverlap.email }, process.env.JWT_SECRET)
}

module.exports = {
    signUp,
    signIn
}