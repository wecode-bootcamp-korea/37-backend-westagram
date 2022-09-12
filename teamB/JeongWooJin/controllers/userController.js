const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, profileImage, password } = req.body;

    if (!name || !email || !profileImage || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, profileImage, password);
    return res.status(201).json({
      message: "userCreated",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userInfo = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const result = await userService.userInfo(userId);
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const accessToken = await userService.signIn( email, password);
    res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    res
      .status(err.statusCode ? err.statusCode : 401)
      .json({ message: err.message });
  }
};


module.exports = {
  signUp,
  userInfo,
  signIn
};
