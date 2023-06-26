const express = require("express");

const appRouter = express.Router();

appRouter.use("/auth", require("./auth"));
appRouter.use("/posts", require("./post"));
appRouter.use("/users", require("./user"));

module.exports = appRouter;
