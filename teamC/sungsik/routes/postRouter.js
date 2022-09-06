const express = require("express");
const postController = require("../controllers/postController")

const router = express.Router()

router.post("/posting", postController.posting);
router.get("/lookup", postController.lookUp);
router.get("/lookup/:userId", postController.lookUpById);
router.patch("/update/:postId", postController.updatePost);
router.delete("/delete/:postId", postController.deletePost);

module.exports = {
    router
}