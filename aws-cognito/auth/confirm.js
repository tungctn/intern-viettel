require("dotenv").config();
const { cognito } = require("./cognito");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const confirm = async (req, res, next) => {
  const { email, code, username } = req.body;

  const params = {
    ClientId: process.env.CLIENT_POOL_ID,
    ConfirmationCode: code,
    Username: email,
  };

  // get name from cognito

  cognito.confirmSignUp(params, async (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      console.log(data);
      await User.create({
        id: uuidv4(),
        email,
        username,
      });
      return res.status(200).json({
        success: true,
        message: "User confirmed successfully",
      });
    }
  });
};

module.exports = confirm;
