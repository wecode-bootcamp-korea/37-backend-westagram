//실제 로직이 돌아가는 파일
const { userDao } = require('../models/')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (first_name, last_name, age, email, password, profile_image) => {
    const saltRounds = 10;
    const makeHash = async (password, saltRounds) => {
        return await bcrypt.hash(password, saltRounds);
    };
    
    hashedPassword = await makeHash(password, saltRounds);
    return await userDao.createUser(first_name, last_name, age, email, hashedPassword, profile_image);
}

const postList = async (userId) => {
    return await userDao.getAllInfo(userId);
}


//     const pwValidation = new RegExp(
    //         '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    //     );
    // password validation using REGEX
//     if (!pwValidation.test(password)) {
//         const err = new Error('PASSWORD_IS_NOT_VALID');
//         err.statusCode = 400;
//         throw err;
//     }
//     const createUser = await userDao.createUser(
//         first_name, 
//         last_name, 
//         age
//     );

//     return createUser;
// };

module.exports = {
    signUp,
    postList
}