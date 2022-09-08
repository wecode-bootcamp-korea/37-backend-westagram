const userService = require("../services/userService");

const signUp = async (req, res) => {
    const { name, email, profileImage, password } = req.body;

    if ( !name || !email || !profileImage || !password ) {
            return res.status(400).json({ message:"KEY_ERROR" });
    }

    await userService.signUp( name, email, profileImage, password );

    res.status(201).json({ message:"SIGNUP_SUCCESS" });
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if ( !email || !password ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const accessToken = await userService.signUp( email, password );

    res.status(201).json({ message:'LOGIN_SUCCEESS' , accessToken:accessToken })
}

module.exports = {
    signUp,
    signIn
}