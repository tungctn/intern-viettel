const server = require("./app");
const serverlessExpress = require("@vendia/serverless-express");

exports.handler = serverlessExpress({ app: server });
