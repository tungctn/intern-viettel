const Post = require("../models/Post");
const { v4: uuidv4 } = require("uuid");

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
    const { title, description, url, status, source } = req.body;

    // Simple validation
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });

    try {
      let updatedPost = {
        title,
        description: description || "",
        url: url,
        status: status || "TO LEARN",
        source: source || "",
      };

      // update post
      await Post.update({ id: req.params.id }, updatedPost);

      // User not authorised to update post or post not found
      if (!updatedPost) {
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised",
        });
      }

      const updatePost = await Post.scan("id").eq(req.params.id).exec();

      return res.json({
        success: true,
        message: "Excellent progress!",
        post: updatePost[0],
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  createPost: async (req, res) => {
    const { title, description, url, status, source } = req.body;

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
          source: source || "",
          id: uuidv4(),
        },
        (err, post) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ success: false, message: "Internal server error123" });
          } else {
            console.log(post);
            return res.status(200).json({
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
  searchPost: async (req, res) => {
    const { searchQuery } = req.params;
    try {
      const posts = await Post.scan().exec();
      const filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return res.json({ success: true, posts: filteredPosts });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
    }
  },
  searchOwnPost: async (req, res) => {
    const { searchQuery } = req.params;
    try {
      const posts = await Post.scan("userId").eq(req.userId).exec();
      const filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return res.json({ success: true, posts: filteredPosts });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
    }
  },
};

module.exports = PostController;
