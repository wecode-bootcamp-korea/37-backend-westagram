const express = require("express");
const { asyncWrap } = require('../middlewares/asyncWrap')
const { validateToken } = require('../middlewares/validateToken')
const postController = require("../controllers/postController")

const postRouter = express.Router()

postRouter.post("/posting", validateToken, asyncWrap(postController.createPosting));
postRouter.get("/lookup", validateToken, asyncWrap(postController.lookUp));
postRouter.get("/lookup/:userId", validateToken, asyncWrap(postController.lookUpById));
postRouter.patch("/update/:postId", validateToken, asyncWrap(postController.updatePost));
postRouter.delete("/delete/:postId", validateToken, asyncWrap(postController.deletePost));

module.exports = { postRouter }