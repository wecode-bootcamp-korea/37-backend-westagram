const likesService = require('../services/likesService');

const likePost = async (req, res) => {
    const { userId, postId } = req.params
    console.log(userId)

    if ( !userId || !postId ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await likesService.likePost( userId, postId )

    res.status(201).json({ message:"LIKE_SUCCESS" });
}

const deleteLikes = async (req, res) => {
    const { userId, postId } = req.params
    console.log(userId)
    
    if ( !userId || !postId ) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await likesService.deleteLikes(userId, postId)

    res.status(201).json({ message:"DELETE_SUCCESS"})
}

module.exports = {
    likePost,
    deleteLikes
}