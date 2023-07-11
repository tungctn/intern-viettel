const AWS = require("aws-sdk");
const rekognition = new AWS.Rekognition({ region: "ap-southeast-1" });
const User = require("./models/User");
const axios = require("axios");

exports.handler = async (event, context) => {
  const url = JSON.parse(event.Records[0].Sns.Message).url;
  const user_id = JSON.parse(event.Records[0].Sns.Message).user_id;
  
};
