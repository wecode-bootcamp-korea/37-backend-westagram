const { json } = require("express");
const postService = require("../services/postService")

const createPosting = async (req, res) => {
    const { title, content, postingImage, userId } = req.body;

    if ( !title || !content || !postingImage || !userId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error
    }

    await postService.createPosting(title, content, postingImage, userId)

    res.status(201).json({ message:'POST_CREATED'})
}
   

const lookUp = async (req, res) => {
    const lookUp = await postService.lookUp();

    res.status(201).json({ data:lookUp })
}

const lookUpById = async (req, res) => {
    const { userId } = req.params;
    
    if ( !userId ) {
        const error = new Error("KEY_ERROR");
        error.statusCode = 400;
        throw error;
    }
    
    const lookUpById = await postService.lookUpById(userId)

    res.status(201).json({ lookUpById }) 
}

const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content, postingImage } = req.body;

    if ( !postId || !title || !content || !postingImage ) {
        const error = new Error("KEY_ERROR");
        error.statusCode = 400;
        throw error;
    }
        
    await postService.update( postId, title, content, postingImage)

    res.status(201).json({ message:"POST_UPDATED"})
}

const deletePost = async (req, res) => {
    const { postId } = req.params

    if ( !postId ) {
        const error = new Error("KEY_ERROR");
        error.statusCode = 400;
        throw error;
    }

    await postService.deletePost(postId)

    res.status(201).json({ message:"POST_DELETED" })
}

module.exports = {
    createPosting,
    lookUp,
    lookUpById,
    updatePost,
    deletePost
}