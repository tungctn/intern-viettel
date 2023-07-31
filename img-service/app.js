const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", router);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

module.exports = app;
