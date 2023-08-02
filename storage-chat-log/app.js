const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

router.get("/", (req, res) => {
  //   console.log(localStorage.getItem("messages"));
  // log localStorage.getItem("messages")
  console.log(localStorage.getItem("messages"));
});

module.exports = app;
