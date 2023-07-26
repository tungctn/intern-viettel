const User = require("../models/User");
const { dynamodb } = require("../utils/db.config");
const { convertObject } = require("../utils/object.convert");

const UserController = {
  updateUser: async (req, res) => {
    // const { name, email, password } = req.body;
    const user_id = req.params.id;

    try {
      let updatedUser = {
        ...req.body,
      };

      // update user
      await User.update({ id: req.params.id }, updatedUser);

      // User not authorised to update user or user not found
      if (!updatedUser) {
        return res.status(401).json({
          success: false,
          message: "User not found or user not authorised",
        });
      }

      const updateUser = await User.scan("id").eq(req.params.id).exec();

      return res.json({
        success: true,
        message: "Excellent progress!",
        user: updateUser,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  getUsers: async (req, res) => {
    try {
      let users = await dynamodb.scan({ TableName: "users" }).promise();
      users = users.Items.map((user) => convertObject(user)).filter((user) => {
        return user.id !== req.userId;
      });
      return res.json({ success: true, users: users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = UserController;
