const postDao = require("../models/postDao")

const createPosting = async (title, content, postingImage, userId) => {
       
    const createNewPost = await postDao.createNewPost(
        title,
        content,
        postingImage,
        userId
    ) 
}

const lookUp = async () => {
    const postLookUp = await postDao.postLookUp();

    return postLookUp
}

const lookUpById = async (userId) => {
    const postLookUpById = await postDao.postLookUpById(userId);

    return postLookUpById
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
    createPosting,
    lookUp,
    lookUpById,
    updatePost,
    deletePost
}