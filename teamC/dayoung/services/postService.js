const postDao = require('../models/postDao')

const postInput = async (title, content, userId) => {

      const createPost = await postDao.createPost(
        title,
        content, 
        userId
        );
        return createPost;
 };

 const postCheck = async () => {

  const DataPost = await postDao.DataPost();
    return DataPost;
  };

  const postUserCheck = async (userId) => {

    const DataUserPost = await postDao.DataUserPost(
      userId
      );
      const result = {};
  
      console.log(DataUserPost[1]);
      result["userId"] = DataUserPost[1][0].id;
      result["userProfileImage"] =DataUserPost[1][0].profile_image;
      result["posting"] = DataUserPost[0];
      console.log(result);
      return result;
};

  
  module.exports = {
    postInput, postCheck, postUserCheck
  }

 