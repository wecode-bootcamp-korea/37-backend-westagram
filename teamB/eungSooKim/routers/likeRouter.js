const express = require("express");
const likeControllers = require("../controllers/likeControllers");

const router = express.Router();

router.post("/", likeControllers.likePost);

module.exports = {
  router,
};
