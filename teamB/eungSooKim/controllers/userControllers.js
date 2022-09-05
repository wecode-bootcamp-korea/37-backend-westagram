const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, password, profileImage);
    return res.status(201).json({
      message: "userCreated",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userPosts = async(req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "유저id를입력하세요"})
    }
    let result = await userService.userPosts(userId);
    return await res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp, userPosts,
};
