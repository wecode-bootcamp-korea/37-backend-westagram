const userDao = require("../models/postDao")

const posting = async (title, content, postingImage, userId) => {
    const createPost = await postDao.createPost(
        title,
        content,
        postingImage,
        userId
    )
}

const lookUp = async () => {
    const postLookUp = await postDao.postLookUp();
}

const lookUpById = async (userId) => {
    const postLookUpById = await postDao.postLookUpById(userId);
}

const updatePost = async ( postId, title, content, postingImage) => {
    const postUpdate = await postDao.postUpdate(
        postId,
        title,
        content,
        postingImage
    )
}

const deletePost = async (postId) => {
    const postDelete = await postDao.postDelete(postId)
}

module.exports = {
    posting,
    lookUp,
    lookUpById,
    updatePost,
    deletePost
}