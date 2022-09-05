const express = require("express");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

router.post("/write/:userId", postControllers.writePost);
router.get("/all", postControllers.postsList);

module.exports = {
  router,
};
