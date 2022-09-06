const postService = require('../services/postService');

// 게시글 등록
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

//게시글 전체 조회
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

// 유저별 게시글 존회
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

// 게시글 수정
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

// 게시글 삭제
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

// 게시글 좋아요 등록
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