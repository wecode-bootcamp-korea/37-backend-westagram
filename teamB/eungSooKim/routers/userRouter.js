const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/", userControllers.signUp);

router.get("/posts", userControllers.getUserPosts, userControllers.getPostsUser);

module.exports = {
  router,
};
