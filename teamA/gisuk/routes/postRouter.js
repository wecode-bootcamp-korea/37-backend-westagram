const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");


router.get("/search", postController.search);

router.post("/up", postController.postUp);

router.patch("/edit/:postId", postController.postEdit);

router.delete("/delete/:postId", postController.postDelete);


module.exports = {
    router
}