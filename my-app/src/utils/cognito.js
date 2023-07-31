// const AWS = require("aws-sdk");

import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-southeast-1",
});

const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

// cognito set expried token

export default cognito;
