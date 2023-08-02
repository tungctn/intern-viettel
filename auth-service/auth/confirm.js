require("dotenv").config();
const { cognito } = require("./cognito");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const { dynamodb } = require("../utils/db.config");

const confirm = async (req, res, next) => {
  const { email, code, firstName, lastName } = req.body;

  const params = {
    ClientId: process.env.CLIENT_POOL_ID,
    ConfirmationCode: code,
    Username: email,
  };

  cognito.confirmSignUp(params, async (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      await dynamodb
        .putItem({
          TableName: "users",
          Item: {
            id: { S: String(uuidv4()) },
            firstName: { S: firstName },
            lastName: { S: lastName },
            img: {
              S: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
            },
            email: { S: email },  
            createdAt: { N: Date.now().toString() },
            updatedAt: { N: Date.now().toString() },
          },
        })
        .promise();
      return res.status(200).json({
        success: true,
        message: "User confirmed successfully",
      });
    }
  });
};

module.exports = confirm;
