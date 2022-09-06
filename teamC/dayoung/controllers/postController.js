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
    console.log(result);
    return res.status(201).json({
      Data : result
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
	postInput, postCheck, postUser
}