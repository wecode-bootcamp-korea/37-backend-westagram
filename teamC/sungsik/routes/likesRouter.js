const express = require('express')
const asyncWrap = require('../errorHandler/asyncWrap')
const likesController = require('../controllers/likesController')

const router = express.Router();

router.post('/:userId/:postId', asyncWrap.asyncWrap(likesController.likePost));
router.delete('/:userId/:postId', asyncWrap.asyncWrap(likesController.deleteLikes))

module.exports = {
    router
}