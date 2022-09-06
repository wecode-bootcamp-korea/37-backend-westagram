const { json } = require("express");
const postService = require("../services/postService")

const posting = async (req, res) => {
    try {
        const { title, content, postingImage, userId } = req.body;

        if ( !title || !content || !postingImage || !userId) {
            return res.status(400).json({ message:"KEY_ERROR"})
        }

        await postService.posting(title, content, postingImage, userId)
    } catch {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message:err.message });
    }
}
   

const lookUp = async () => {
    await postService.lookUp();
}

const lookUpById = async (req, res) => {
    try {
    const { userId } = req.params;
    
    if ( !userId ) {
        return res.status(400).json({ message:"KEY_ERROR" })
    }
    
    await postService.lookUpById(userId)
    } catch {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message:err.message })
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content, postingImage } = req.body;

        if ( !postId || !title || !content || !posting_image ) {
            return res.status(400).json({ message:"KEY_ERROR" })
        }
        
        await postService.update( postId, title, content, postingImage)
    } catch {
        console.log(err)
        return res.status(err.statusCode || 500).json({ message:err.message })
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params

        if ( !postId ) {
            return res.status(400).json({ message:"KEY_ERROR" })
        }

        await postService.deletePost(postId)
    } catch {
        console.log(err)
        return res.status(err.statusCode || 500).json({ message:err.message })
    }
}

module.exports = {
    posting,
    lookUp,
    lookUpById,
    updatePost,
    deletePost
}