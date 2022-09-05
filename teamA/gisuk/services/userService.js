const userDao = require("../models/userDao");

const userPost = async ( userId ) => {
    const [user, post] = await userDao.userPost(
        userId
    );
    const result = user[0];
    result.posting = post;
    return result;
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
    const createUser = await userDao.createUser(
        name,
        email,
        password,
        profileImage
    );
    return createUser;
};


module.exports = {
    userPost,
    signUp
}
