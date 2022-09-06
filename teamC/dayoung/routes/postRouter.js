
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/enroll', postController.postInput);
router.get('/lookup', postController.postCheck);
router.get('/:userId', postController.postUser);

module.exports = {
	router
}