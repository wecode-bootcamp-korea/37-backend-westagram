const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/enrollpost', postController.enrollPost);
router.get('/lookup', postController.postLookup);
router.patch('/modifyPost/:post_id',postController.modifyPost);
router.delete('/deletePost/:post_id',postController.deletePost);


module.exports = {
	router
}