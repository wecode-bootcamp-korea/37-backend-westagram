const express = require("express");
const { asyncWrap } = require('../errorHandler/asyncWrap')
const postController = require("../controllers/postController")

const postRouter = express.Router()

postRouter.post("/posting", asyncWrap(postController.createPosting));
postRouter.get("/lookup", asyncWrap(postController.lookUp));
postRouter.get("/lookup/:userId", asyncWrap(postController.lookUpById));
postRouter.patch("/update/:postId", asyncWrap(postController.updatePost));
postRouter.delete("/delete/:postId", asyncWrap(postController.deletePost));

module.exports = { postRouter }