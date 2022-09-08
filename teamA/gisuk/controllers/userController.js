const userService = require("../services/userService");

const userPost = async (req, res) => {
    try {
        const userId = req.params.userId;
        if ( !userId ) {
            return res.status(400).json({ message: "KEY_ERROR" })
        }
        const result = await userService.userPost( userId );
        res.status(200).json({ data: result });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ( !email || !password ) {
            return res.status(400).json({ message : "KEY_ERROR" })
        }
        const result = await userService.signIn( email, password );
        if (result == "error" ) {
            return res.status(400).json({ message: "Invalid User" })
        }
        return res.status(200).json({ accessToken: result })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const signUp = async (req, res) => {
    try {
        const { name, email, password, profileImage } = req.body;
        if( !name || !email || !password || !profileImage) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }
        await userService.signUp( name, email, password, profileImage );

        res.status(201).json({ message: "userCreated" });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};


module.exports = {
    userPost,
    signIn,
    signUp
}