const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNiwiaWF0IjoxNjYyMzgzNDM0fQ.67CK-oTCEQx2kiMHRDm188n-pjrutDDBosW-lagg9I4

//"email": "jjllo@email.com",
//"password": "Jjjllo123@"
const makeHash = async (password, saltRound) => {
    return await bcrypt.hash(password, saltRound);
}
const checkHash = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword) // (1)
}

const userPost = async ( userId ) => {
    const [ user, post ] = await userDao.userPost(
        userId
    );
    user.posting = post;
    return user;
}

const signIn = async ( email, password ) => {
    const user = await userDao.signIn(
        email
    );
    const checkPassword = await checkHash(password, user.password);
    if(!checkPassword) {
        return "error"
    }
    const userId = {
        user_id : user.id
    }
    const jwtToken = jwt.sign(userId, "secretKey");
    return jwtToken
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
    signIn,
    signUp
}
