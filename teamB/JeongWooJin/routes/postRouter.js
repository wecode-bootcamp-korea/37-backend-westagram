const express = require("express");

const postController = require("../controllers/postController");
const auth = require("../middlewares/auth")
const router = express.Router();

router.post("/createpost", auth.validateToken, postController.createPost);
router.get("/lookup", postController.getPostList);
router.patch("/modifyPost/:post_id", postController.modifyPost);
router.delete("/deletePost/:post_id", postController.deletePost);

module.exports = {
  router
};
