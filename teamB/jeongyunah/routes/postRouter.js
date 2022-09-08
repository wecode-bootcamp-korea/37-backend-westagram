const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/postup', postController.createPost);
router.get('/lookup',postController.getPostList);
router.get('/userPosts/:userId',postController.getUserPostList);
router.patch('/modifyPost/:postId', postController.modifyPost);
router.delete('/removePost/:postId', postController.removePost);

module.exports = {
	router
}