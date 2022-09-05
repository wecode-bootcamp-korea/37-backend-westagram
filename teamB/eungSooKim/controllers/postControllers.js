const postService = require("../services/postService");

const writePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.params.userId;

    if (!title || !content) {
      return res.status(400).json({ message: "제목과 내용을 입력하세요" });
    }

    await postService.writePost(title, content, userId);
    return res.status(201).json({
      message: "게시되었습니다",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postsList = async (req, res) => {
  try{
    return res.status(200).json(postService.postsList)
  } catch(err){
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }

};

module.exports = {
  writePost, postsList
};
