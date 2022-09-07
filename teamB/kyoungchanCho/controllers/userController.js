// client의 입출력 관리 ,request/response
const { userService } = require('../services')

const signUp = async (req, res) => {
    const { name, email, profileImage, password } = req.body;
    const user = await userService.signUp(name, email, profileImage, password);

    return res.status(201).json({ result : user });
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.signIn(email, password)
    console.log(user)
    return res.status(200).json({ token : user})
}

const getPostsByUser = async (req, res) => {
    const posts = await userService.getPostsByUser()
    return res.status(200).json({ data : posts})
}

module.exports = {
    signUp,
    signIn,
    getPostsByUser,
}
