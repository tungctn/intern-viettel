require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const AuthController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    // Simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username and/or password" });

    try {
      const user = await User.scan("username").eq(username).exec();
      if (user.length === 0)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });

      const passwordValid = await bcryptjs.compare(
        req.body.password,
        user[0].password
      );
      if (!passwordValid)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });

      const accessToken = jwt.sign(
        { userId: user[0].id },
        process.env.JWT_SECRET
      );

      return res.json({
        success: true,
        message: "User logged in successfully",
        user: user[0],
        accessToken,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json();
    }
  },

  register: async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username and/or password" });

    try {
      // Check for existing user
      const user = await User.scan("username").eq(username).exec();

      if (user.length > 0)
        return res
          .status(400)
          .json({ success: false, message: "Username already taken" });

      const salt = await bcryptjs.genSalt(10);
      const hashed = await bcryptjs.hash(password, salt);
      const newUser = await User.create(
        {
          username: username,
          password: hashed,
          email: email,
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ success: false, message: "Internal server error11" });
          } else {
            console.log(data);
            return res.json({
              success: true,
              message: "User created successfully",
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

  auth: async (req, res) => {
    try {
      const user = await User.scan("id").eq(req.userId).exec();
      if (user.length === 0)
        return res
          .status(400)
          .json({ success: false, message: "User not found" });

      return res.json({ success: true, user: user[0] });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = AuthController;
