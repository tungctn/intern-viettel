const Post = require("../models/Post");
const { v4: uuidv4 } = require("uuid");
const { dynamodb } = require("../utils/db.config");
const { convertObject } = require("../utils/object.convert");

const params = {
  TableName: "posts",
};

const PostController = {
  getPosts: async (req, res) => {
    try {
      const post = new Post();
      const posts = await post.getPosts();
      return res.json({ success: true, posts: posts });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getOwnPosts: async (req, res) => {
    try {
      const post = new Post();
      const posts = await post.getOwnPosts(req.userId);
      return res.json({ success: true, posts: posts });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  updatePost: async (req, res) => {
    const { title, description, url, status, source } = req.body;

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
    const { content, url } = req.body;
    try {
      const newPost = {
        id: uuidv4(),
        content,
        url,
        userId: req.userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const post = new Post(newPost);
      await post.createPost();
      return res.status(200).json({
        success: true,
        message: "Add post successful",
        post: newPost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error });
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = new Post();
      await post.deletePost(req.params.id);
      return res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  likePost: async (req, res) => {
    try {
      let post = await dynamodb
        .scan({
          ...params,
          FilterExpression: "id = :id",
          ExpressionAttributeValues: {
            ":id": {
              S: req.params.id,
            },
          },
        })
        .promise();
      post = convertObject(post.Items[0]);
      let arr = [];
      post.likes.map((like) => {
        arr.push(like[Object.keys(like)[0]]);
      });
      if (arr.includes(req.userId)) {
        return res.json({
          success: false,
          message: "You have already liked this post",
        });
      }
      dynamodb.updateItem(
        {
          ...params,
          Key: {
            id: {
              S: req.params.id,
            },
          },
          UpdateExpression: "set likes = list_append(likes, :newLike)",
          ExpressionAttributeValues: {
            ":newLike": {
              L: [
                {
                  S: req.userId,
                },
              ],
            },
          },
        },
        function (err, data) {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: err });
          }
          console.log(data);
        }
      );

      let updatePost = await dynamodb
        .scan({
          ...params,
          FilterExpression: "id = :id",
          ExpressionAttributeValues: {
            ":id": {
              S: req.params.id,
            },
          },
        })
        .promise();
      updatePost = convertObject(updatePost.Items[0]);
      const user = await dynamodb
        .scan({
          TableName: "users",
          FilterExpression: "id = :userId",
          ExpressionAttributeValues: {
            ":userId": {
              S: req.userId,
            },
          },
        })
        .promise();
      console.log(updatePost);
      return res.json({
        success: true,
        message: "Post updated successfully",
        post: {
          ...updatePost,
          user: convertObject(user.Items[0]),
        },
      });
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
          post.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.topic.toLowerCase().includes(searchQuery.toLowerCase())
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
          post.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return res.json({ success: true, posts: filteredPosts });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
    }
  },
};

module.exports = PostController;
