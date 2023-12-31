require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dynamoose = require("dynamoose");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const appRouter = require("./routes/index");

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "ap-southeast-1",
});

dynamoose.aws.ddb.set(ddb);

app.use("/api", appRouter);

appRouter.get("/", (req, res) => {
  res.json({ success: true, message: "This is home page" });
});

module.exports = app;
