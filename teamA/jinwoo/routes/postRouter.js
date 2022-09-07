const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/postup', postController.postUp);
router.get('', postController.postList);
router.delete('/:postId', postController.postDel)
router.patch('/:postId', postController.postEdit)

module.exports = { router }