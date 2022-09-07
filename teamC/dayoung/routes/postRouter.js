
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/enroll', postController.inputPost);
router.get('/lookup', postController.checkPost);
router.get('/:userId', postController.postUser);
router.patch('/:postId', postController.editPost);
router.delete('/:postId', postController.dltPost);
router.post('/likes/:postId', postController.likePost);

module.exports = {
	router
}