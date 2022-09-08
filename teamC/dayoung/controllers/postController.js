const postService = require('../services/postService');

// 게시글 등록
const inputPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if ( !title || !content || !userId ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.inputPost( title, content, userId);
    return res.status(201).json({
      message: 'postInput_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  
  }
};

//게시글 전체 조회
const checkPost = async (req, res) => {
  try {
    const posts = await postService.checkPost();
    return res.status(201).json({
      Data: posts
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 유저별 게시글 존회
const postUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await postService.postUser(userId);
    return res.status(201).json({
      Data : result
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 게시글 수정
const editPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;
    const result = await postService.inputPostEdit(postId, title, content);
    return res.status(201).json({
      Data : result
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 게시글 삭제
const dltPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    await postService.inputPostDlt(postId);
    return res.status(201).json({
      message : "postingDeleted"
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 게시글 좋아요 등록
const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId } = req.body;
    await postService.inputPostLike(postId, userId);
    return res.status(201).json({
      message : "likedUpdated"
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = {
  inputPost, checkPost, postUser, editPost, dltPost, likePost
}