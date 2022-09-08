const likeService = require('../services/likeService');

const addLike = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const post_id = req.params.postId;

    if (!user_id || !post_id) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await likeService.addLike(user_id, post_id);

    return res.status(201).json({
      message: "likeCreated"
    });

  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  addLike
}