const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/enrollpost', postController.enrollPost);
router.get('/lookup', postController.postLookup);
router.patch('/modifyPost/:post_id',postController.modifyPost);



module.exports = {
	router
}