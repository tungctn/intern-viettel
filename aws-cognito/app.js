const express = require("express");
// const router = express.Router();

const cors = require("cors");
const app = express();

// app router
const router = express.Router();

const register = require("./auth/register");
const confirm = require("./auth/confirm");
const login = require("./auth/login");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/auth", router);

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the API",
  });
});

router.post("/register", register);
router.post("/confirm", confirm);
router.post("/login", login);

module.exports = app;
