const express = require("express");
const { postController } = require('../controllers');

const router = express.Router();

router.post('', postController.postPost);
router.get('', postController.getPosts);
router.get('/users/:userId', postController.getPostsByUser);
router.patch('/:postId', postController.patchPost);
router.delete('/:postId', postController.deletePost);

module.exports = router;