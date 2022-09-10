const express = require("express");
const router = express.Router();

const  validateToken  = require("../middlewares/authUser");
const { postController } = require("../controllers");

router.get("/all", postController.getPostAll);
router.post("/upload", validateToken, postController.getPostUpload);
router.patch("/update", validateToken, postController.getPostUpdate);
router.delete("/erase", validateToken, postController.getPostDelete);

module.exports = router;
 