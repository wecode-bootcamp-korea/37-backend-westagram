const postService = require('../services/postService');

const postUp = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if ( !title || !content || !userId ) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }

    await postService.postUp( title, content, userId );
    return res.status(201).json({ message : 'POSTUP_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

const postList = async (req, res) => {
    const postsWesta = await postService.postList();
    return res.status(201).json({ data : postsWesta });
  }

const postDel = async (req, res) => {
  try {
    const postId = req.params.postId;
    await postService.postDel(postId);
    return res.status(201).json({ message : 'DELETE_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

const postEdit = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;

    if ( !postId || !title || !content ) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }
    await postService.postEdit( postId, title, content );
    return res.status(201).json({ message : 'EDIT_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

module.exports = { postUp, postList, postDel, postEdit}