const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if ( !name || !email || !password || !profileImage ) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }

    await userService.signUp( name, email, password, profileImage );
    return res.status(201).json({ message : 'SIGNUP_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

const postsById = async (req, res) => {
  try {
    const userId = req.params.userId;
    if ( !userId ) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }

    const qq = await userService.postsById(userId);
    return res.status(201).json({ data : qq });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
}

module.exports = { signUp, postsById }