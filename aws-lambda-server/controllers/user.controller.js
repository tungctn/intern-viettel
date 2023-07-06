const User = require("../models/User");

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
};

module.exports = UserController;
