const { userDao } = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//정규표현식 관련 에러 비즈니스로직에 추가
const signUp = async (name, email, profileImage, password) => {
    const saltRounds = 10;
    const makeHash = async (password, saltRounds) => { 
        return await bcrypt.hash(password, saltRounds);
    };
    hashedPassword = await makeHash(password, saltRounds);
    return await userDao.postUser(name, email, profileImage, hashedPassword);
};

const signIn = async (email, password) => {
    const user= await userDao.verifyUser(email);

    const checkHash = await bcrypt.compare(password, user.password)
    if(!checkHash) {
        const err = new Error("invalid password");
        err.statusCode = 400;
        throw err;
    }
    return jwt.sign({ sub: user.id, email: user.email }, process.env.SECRETKEY);
};

module.exports = {
    signUp,
    signIn,
}