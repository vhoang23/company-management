var express = require("express");
var router = express.Router();
const auth = require("../auth/auth");
const PostController = require("../app/controllers/PostController");
const isDirector = require("../auth/isDirector");

router.get("/", auth, PostController.getAllPost);
router.get("/:postId", auth, PostController.getDetailPost);
router.post("/", auth, PostController.addPost);
router.put("/:postId", auth, PostController.updatePost);
router.delete("/:postId", auth, PostController.deletePost);

module.exports = router;
