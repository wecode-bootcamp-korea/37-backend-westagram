const express = require("express");

const postControllers = require("../controllers/postControllers");

const router = express.Router();
const {accessToken} = require("../middleware/auth");

router.post("/",accessToken,postControllers.writePost);
router.get("/", postControllers.getPostsList);
router.put("/", postControllers.modifyPost);
router.delete("/", postControllers.deletePost);

module.exports = {
  router,
};