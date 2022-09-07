//실제 로직이 돌아가는 파일
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userDao } = require('../models/')

const signUp = async (first_name, last_name, age, email, password, profile_image) => {
    const saltRounds = 10;
    const makeHash = async (password, saltRounds) => {
        return await bcrypt.hash(password, saltRounds);
    };
    
    hashedPassword = await makeHash(password, saltRounds);
    return await userDao.createUser(first_name, last_name, age, email, hashedPassword, profile_image);
};

const postList = async (userId) => {
    return await userDao.getAllInfo(userId);
};

module.exports = {
    signUp,
    postList
}