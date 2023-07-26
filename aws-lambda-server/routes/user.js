const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const UserController = require("../controllers/user.controller");

router.get("/", verifyToken, UserController.getUsers);
router.put("/:id", verifyToken, UserController.updateUser);

module.exports = router;
