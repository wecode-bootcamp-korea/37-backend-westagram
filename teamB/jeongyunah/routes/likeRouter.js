const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/addLike/:userId/:postId',likeController.addLike);

module.exports = {
	router
}