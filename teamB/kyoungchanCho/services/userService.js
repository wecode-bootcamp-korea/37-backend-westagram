//user 관련 서비스 
const { userDao } = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signUp = async (name, email, profileImage, password) => {
    const saltRounds = 10;
    const makeHash = async (password, saltRounds) => { 
        return await bcrypt.hash(password, saltRounds);
    };

    hashedPassword = await makeHash(password, saltRounds);
    return await userDao.createUser(name, email, profileImage, hashedPassword);
};

module.exports = {
    signUp,
}