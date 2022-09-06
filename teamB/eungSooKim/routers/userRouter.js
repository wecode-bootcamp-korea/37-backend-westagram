const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post("/", userControllers.signUp);

router.get("/posts", userControllers.userPosts);

module.exports = {
  router,
};
