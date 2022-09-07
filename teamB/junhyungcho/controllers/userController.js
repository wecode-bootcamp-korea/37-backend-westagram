//controller/userController.js
//presentation layer
//res, req 담당
const { userService } = require('../services');

const signUp = async (req, res) => {
    try {
        const { first_name, last_name, age, email, password, profile_image } = req.body;

        if ( !first_name || !last_name || !email || !password ) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        const user = await userService.signUp( first_name, last_name, age, email, password, profile_image );

        return res.status(201).json({ data: user });
    }
    
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
};

const postList = async (req, res) => {
    try {
        let { userId } = req.body;

        if ( !userId ) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        const postList = await userService.inquireUserInfo(userId);

        return res.status(200).json({ data: postList });
    }

    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password ) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        const signIn = await userService.signIn(email, password);

        return res.status(200).json({ message: signIn });

    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

module.exports = {
    signUp,
    postList,
    signIn
}
