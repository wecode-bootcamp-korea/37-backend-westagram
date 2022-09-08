const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

router.post("", likeController.heart);

module.exports = router;
