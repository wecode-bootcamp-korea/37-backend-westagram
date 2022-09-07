const postDao = require('../models/postDao')

const postUp = async (title, content, user_id) => {
    const createPost = await postDao.createPost(
        title,
        content,
        user_id
    );
    return createPost;
}

const postLookup = async() => {
    const lookUpPost = await postDao.lookUpPost();
    return lookUpPost;
}

const userPosts = async(user_id) => {
    const [dataUsers, dataPosts] = await postDao.userPost(
        user_id
    );
    dataUsers[0].postings = dataPosts;
    return dataUsers[0];
}

const modifyPost = async(post_id, content) => {
    const modifyPost = await postDao.modifyPost(
        post_id, 
        content
    );
    return modifyPost;
}

const removePost = async (post_id) => {
    const removePost = await postDao.removePost(
        post_id
    );
    return removePost;
}

module.exports = {
    postUp,
    postLookup,
    userPosts,
    modifyPost,
    removePost
}