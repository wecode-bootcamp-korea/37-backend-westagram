const jwt = require('jsonwebtoken');
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

// const signIn = async (email, password) => {
    

//     const checkHash = async (password, hashedPassword) => {
//         return await bcrypt.compare(password, hashedPassword) // (1)
//     }

//     const main = async () => {
//         const hashedPassword = await makeHash("password", 12);
//         const result = await checkHash("password", hashedPassword);
//         console.log(result);
//     };
    
//     if (!user) {
//         const err = new Error("specified user does not exist");
//         err.statusCode = 404;
//         throw err;
//     }
// };

const inquireUserInfo = async (userId) => {
    const userInfo = await userDao.getUserIdImage(userId);
    userInfo.postings = await userDao.getUserPosting(userId);
    return userInfo;
}

// const postList = async (userId) => {
//     return await userDao.getAllInfo(userId);
// };

module.exports = {
    signUp,
    inquireUserInfo,
    // signIn
}