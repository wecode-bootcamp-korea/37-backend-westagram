const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const makeHash = async (password, saltRound) => {
    return await bcrypt.hash(password, saltRound);
}

const userPost = async ( userId ) => {
    const [ user, post ] = await userDao.userPost(
        userId
    );
    user.posting = post;
    return user;
}

const signUp = async ( name, email, password, profileImage ) => {
    const pwValidation = new RegExp(
        `^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})`
    );
    if(!pwValidation.test(password)) {
        const err = new Error(`PASSWORD_IS_NOT_VALID`);
        err.statusCode = 400;
        throw err;
    }

    const hashPassword = await makeHash(password,12);

    const createUser = await userDao.createUser(
        name,
        email,
        hashPassword,
        profileImage
    );
    return createUser;
};


module.exports = {
    userPost,
    signUp
}
