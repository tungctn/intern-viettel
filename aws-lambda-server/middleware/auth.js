const jwt = require("jsonwebtoken");
require("dotenv").config();
const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-southeast-1",
});

const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  try {
    const params = {
      AccessToken: token,
    };

    cognito.getUser(params, async (err, data) => {
      console.log(params);
      if (err) {
        res.status(400).json({
          err: err,
          params: params,
        });
      } else {
        const user = await User.scan("email").eq(data.Username).exec();
        if (user.length === 0) {
          return res
            .status(400)
            .json({ success: false, message: "User not found" });
        }
        req.userId = user[0].id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, message: error.message, authHeader });
  }
};

module.exports = verifyToken;
