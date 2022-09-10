const express = require("express");

const postControllers = require("../controllers/postControllers");

const router = express.Router();
const accessToken = require("../utils/accessToken");

router.post("/",accessToken.accessToken, postControllers.writePost);
router.get("/", postControllers.getPostsList);
router.put("/", postControllers.modifyPost);
router.delete("/", postControllers.deletePost);

module.exports = {
  router,
};
