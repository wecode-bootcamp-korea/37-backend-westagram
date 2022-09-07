const express = require('express')
const { asyncWrap } = require('../errorHandler/asyncWrap')
const likesController = require('../controllers/likesController')

const likesRouter = express.Router();

likesRouter.post('/:userId/:postId', asyncWrap(likesController.likePost));
likesRouter.delete('/:userId/:postId', asyncWrap(likesController.deleteLikes))

module.exports = { likesRouter }
