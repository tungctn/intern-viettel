const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const dynamoose = require("dynamoose");

const register = require("./auth/register");
const confirm = require("./auth/confirm");
const login = require("./auth/login");

app.use(
  cors({
    origin: "*",
    methods: "POST",
  })
);

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "ap-southeast-1",
});

dynamoose.aws.ddb.set(ddb);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/auth", router);

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the API",
    dashboard: "http://localhost:3000",
  });
});

router.post("/register", register);
router.post("/confirm", confirm);
router.post("/login", login);

module.exports = app;
