const { json } = require("express");
const postService = require("../services/postService")

const posting = async (req, res) => {
    const { title, content, postingImage, userId } = req.body;

    if ( !title || !content || !postingImage || !userId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error
    }

    await postService.posting(title, content, postingImage, userId)
}
   

const lookUp = async () => {
    await postService.lookUp();
}

const lookUpById = async (req, res) => {
    const { userId } = req.params;
    
    if ( !userId ) {
        return res.status(400).json({ message:"KEY_ERROR" })
    }
    
    await postService.lookUpById(userId)
}

const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content, postingImage } = req.body;

    if ( !postId || !title || !content || !posting_image ) {
        return res.status(400).json({ message:"KEY_ERROR" })
    }
        
    await postService.update( postId, title, content, postingImage)
}

const deletePost = async (req, res) => {
    const { postId } = req.params

    if ( !postId ) {
        return res.status(400).json({ message:"KEY_ERROR" })
    }

    await postService.deletePost(postId)
}

module.exports = {
    posting,
    lookUp,
    lookUpById,
    updatePost,
    deletePost
}