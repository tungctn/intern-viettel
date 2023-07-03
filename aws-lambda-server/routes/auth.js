const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
require("dotenv").config();
const AuthController = require("../controllers/auth.controller");

router.get("/", verifyToken, AuthController.auth);

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

module.exports = router;
