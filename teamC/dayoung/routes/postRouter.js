
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/enroll', postController.postInput);
router.get('/lookup', postController.postCheck);
router.get('/:userId', postController.postUser);
router.patch('/:postId', postController.postEdit);
router.delete('/:postId', postController.postDlt);
router.post('/likes/:postId', postController.postLike);

module.exports = {
	router
}