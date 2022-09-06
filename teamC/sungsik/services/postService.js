const userDao = require("../models/postDao")

const posting = async (title, content, postingImage, userId) => {
    if (typeof userId !== "number") {
        const error = new Error("USER_ID_INVALID");
        error.statusCode(400);
        throw error;
    }
       
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
    if (typeof postId !== "number") {
        const error = new Error("USER_ID_INVALID");
        error.statusCode(400);
            throw error;
    }

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