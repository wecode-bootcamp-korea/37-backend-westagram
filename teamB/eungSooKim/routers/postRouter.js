const express = require("express");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

router.post("/", postControllers.writePost);
router.get("/", postControllers.postsList);
router.put("/", postControllers.modifyPost);

module.exports = {
  router,
};
