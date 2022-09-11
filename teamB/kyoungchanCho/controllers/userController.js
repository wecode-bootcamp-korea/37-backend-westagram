const { userService } = require('../services')

//키에러 추가
const signUp = async (req, res) => {
    const { name, email, profileImage, password } = req.body;
    const user = await userService.signUp(name, email, profileImage, password);

    return res.status(201).json({ result : user });
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const accessToken = await userService.signIn(email, password)
    return res.status(200).json({ token : accessToken})
}

module.exports = {
    signUp,
    signIn,
}
