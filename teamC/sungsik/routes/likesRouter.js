const express = require('express')
const { asyncWrap } = require('../middlewares/asyncWrap')
const { validateToken } = require('../middlewares/validateToken')
const likesController = require('../controllers/likesController')


const likesRouter = express.Router();

likesRouter.post('/:userId/:postId', validateToken, asyncWrap(likesController.likePost));
likesRouter.delete('/:userId/:postId', validateToken, asyncWrap(likesController.deleteLikes))

module.exports = { likesRouter }
