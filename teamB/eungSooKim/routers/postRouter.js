const express = require("express");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

router.post("/", postControllers.writePost);
router.get("/", postControllers.getPostsList);
router.put("/", postControllers.modifyPost);
router.delete("/", postControllers.deletePost);

module.exports = {
  router,
};
