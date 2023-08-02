const router = require("express").Router();

const uploadImage = require("./imgService/postImage");
const { upload } = require("./imgService/s3Service");

router.post("/upload/:id", upload.single("file"), uploadImage);

module.exports = router;
