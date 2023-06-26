const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");
const PostController = require("../controllers/post.controller");

// @route GET api/posts
// getAllPosts
router.get("/", PostController.getPosts);

// @route GET api/posts/own
// getOwnPosts
router.get("/own", verifyToken, PostController.getOwnPosts);

// @route POST api/posts
// createPost
router.post("/", verifyToken, PostController.createPost);

// @route PUT api/posts
// updatePost
router.put("/:id", verifyToken, PostController.updatePost);

// @route DELETE api/posts
// deletePost
router.delete("/:id", verifyToken, PostController.deletePost);

module.exports = router;
