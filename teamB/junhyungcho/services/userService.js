const bcrypt = require('bcrypt');

const { userDao } = require('../models/')

const signUp = async (first_name, last_name, age, email, password, profile_image) => {
    const saltRounds = 10;
    const makeHash = async (password, saltRounds) => {
        return await bcrypt.hash(password, saltRounds);
    };
    
    const hashedPassword = await makeHash(password, saltRounds);
    return await userDao.createUser(first_name, last_name, age, email, hashedPassword, profile_image);
};

const inquireUserInfo = async (userId) => {
    const userInfo = await userDao.getUserIdImage(userId);
    userInfo.postings = await userDao.getUserPosting(userId);
    return userInfo;
}

module.exports = {
    signUp,
    inquireUserInfo,
}