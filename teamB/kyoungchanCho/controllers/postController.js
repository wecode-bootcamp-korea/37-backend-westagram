const { postService } = require('../services')

const postPost = async (req, res) => {
    const { title, content, userId } = req.body;
    const post = await postService.postPost(title, content, userId)

    return res.status(201).json({ result : post})
}

//limit offset => req.query 수정 필요
const getPosts = async (req, res) => {
    const { limit, offset } = req.body
    if (limit > 100) throw new Error("too Many")
    const posts = await postService.getPosts(parseInt(limit), parseInt(offset))
    return res.status(200).json({ result : posts})
}

const getPostsByUser = async (req, res) => {
    const userId = req.params.userId;
    const posts = await postService.getPostsByUser(userId)

    return res.status(200).json({ result : posts})
}

const patchPost = async (req, res) => {
    const postId = req.params.postId;
    const { title } = req.body
    const post = await postService.patchPost(title, postId)
    const result = await postService.afterPatchPost(postId)
    
    return res.status(201).json({ result : result })
}

const deletePost = async (req, res) => {
    const postId = req.params.postId;
    const deletePost = await postService.deletePost(postId)

    return res.status(200).json({ message : "postingDeleted"})
}

module.exports = {
    postPost,
    getPosts,
    getPostsByUser,
    patchPost,
    deletePost,
}