const express = require("express");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

router.post("/write/:userId", postControllers.writePost);

module.exports = {
  router
};
