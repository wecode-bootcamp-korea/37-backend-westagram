//user 관련 서비스 
const { userDao } = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (name, email, profileImage, password) => {
    const saltRounds = 10;
    const makeHash = async (password, saltRounds) => { 
        return await bcrypt.hash(password, saltRounds);
    };

    hashedPassword = await makeHash(password, saltRounds);
    return await userDao.createUser(name, email, profileImage, hashedPassword);
};

const signIn = async (email, password) => {
    const user= await userDao.exportUser(email);
    console.log(user)
    const checkHash = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword)
    }
    const isVerified = async () => {
        await checkHash(password, user.password);

        if (!isVerified) {
            return "error" 
        } else {
            const token = jwt.sign({ user_id: user.id}, "secretkey");
            return token;    
        }
    };
}

module.exports = {
    signUp,
    signIn,
}