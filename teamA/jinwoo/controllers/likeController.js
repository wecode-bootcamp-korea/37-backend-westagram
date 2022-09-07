const likeService = require('../services/likeService');

const postLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if ( !userId || !postId ) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }

    await likeService.postLike( userId, postId );
    return res.status(201).json({ message : 'LIKE_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

module.exports = { postLike }