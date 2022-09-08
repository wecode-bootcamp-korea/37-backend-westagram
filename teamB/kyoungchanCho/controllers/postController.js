const { postService } = require('../services')

const writePost = async (req, res) => {
    const { title, content, userId } = req.body;
    const post = await postService.writePost(title, content, userId)

    return res.status(201).json({ result : post})
}

const getPosts = async (req, res) => {
    const posts = await postService.getPosts()
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
    writePost,
    getPosts,
    getPostsByUser,
    patchPost,
    deletePost,
}