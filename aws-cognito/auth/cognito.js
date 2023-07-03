const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: "ap-southeast-1",
});

const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

exports.cognito = cognito;
