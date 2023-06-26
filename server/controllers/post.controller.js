const Post = require("../models/Post");

const PostController = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.scan().exec();
      return res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  getOwnPosts: async (req, res) => {
    try {
      const posts = await Post.scan("userId").eq(req.userId).exec();
      return res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  updatePost: async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });

    try {
      let updatedPost = {
        title,
        description: description || "",
        url: url
        status: status || "TO LEARN",
      };

      // update post
      const postUpdateCondition = await Post.update(
        { id: req.params.id },
        updatedPost
      );

      // User not authorised to update post or post not found
      if (!updatedPost)
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised",
        });

      return res.json({
        success: true,
        message: "Excellent progress!",
        post: updatedPost,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  createPost: async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    try {
      const newPost = await Post.create(
        {
          title,
          description,
          url: url,
          status: status || "TO LEARN",
          userId: req.userId,
        },
        (err, post) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ success: false, message: "Internal server error" });
          } else {
            console.log(post);
            return res.json({
              success: true,
              message: "Happy learning!",
              post,
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletedPost = await Post.delete(
        { id: req.params.id },
        (err, data) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ success: false, message: "Internal server error11" });
          } else {
            return res.json({
              success: true,
              message: "Post deleted successfully",
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = PostController;
