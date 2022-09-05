const postDao = require("../models/postDao");

const writePost = async (title, content, userId) => {
    
    const titleAndContent = await postDao.titleAndContent(
        title,
        content,
        userId
    );
      return titleAndContent;
  };

  const postsList =async()=>{
    const A = await postDao.allPosts();
    return A;
    }

module.exports = {
  writePost, postsList
};
