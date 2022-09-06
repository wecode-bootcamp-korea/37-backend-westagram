const express = require("express");
const asyncWrap = require('../errorHandler/asyncWrap')
const postController = require("../controllers/postController")

const router = express.Router()

router.post("/posting", asyncWrap.asyncWrap(postController.posting));
router.get("/lookup", asyncWrap.asyncWrap(postController.lookUp));
router.get("/lookup/:userId", asyncWrap.asyncWrap(postController.lookUpById));
router.patch("/update/:postId", asyncWrap.asyncWrap(postController.updatePost));
router.delete("/delete/:postId", asyncWrap.asyncWrap(postController.deletePost));

module.exports = {
    router
}