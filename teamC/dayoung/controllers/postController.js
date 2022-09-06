const postService = require('../services/postService');

const postInput = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if ( !title || !content || !userId ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.postInput( title, content, userId);
    return res.status(201).json({
      message: 'postInput_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  
  }
};

const postCheck = async (req, res) => {
  try {
    const posts = await postService.postCheck();
    return res.status(201).json({
      Data: posts
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};


const postUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await postService.postUserCheck(userId);
    return res.status(201).json({
      Data : result
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postEdit = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;
    const result = await postService.postEditCInput(postId, title, content);
    return res.status(201).json({
      Data : result
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postDlt = async (req, res) => {
  try {
    const postId = req.params.postId;
    await postService.postDltInput(postId);
    return res.status(201).json({
      message : "postingDeleted"
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId } = req.body;
    await postService.postLikeInput(postId, userId);
    return res.status(201).json({
      message : "likedUpdated"
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = {
	postInput, postCheck, postUser, postEdit, postDlt, postLike
}