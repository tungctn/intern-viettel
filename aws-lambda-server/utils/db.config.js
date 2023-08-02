const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-southeast-1",
});
const dynamodb = new AWS.DynamoDB();

module.exports = { dynamodb };
