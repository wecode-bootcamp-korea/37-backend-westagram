const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/postup', postController.postUp);
router.get('/lookup',postController.postLookup);
router.get('/userPosts/:userId',postController.userPosts);
router.patch('/modifyPost/:postId', postController.modifyPost);
router.delete('/removePost/:postId', postController.removePost);

module.exports = {
	router
}