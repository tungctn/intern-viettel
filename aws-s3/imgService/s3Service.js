// const { Upload } = require("@aws-sdk/lib-storage");
const { PutObjectCommand, S3, S3Client } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;
const multer = require("multer");
require("dotenv").config();

exports.s3Uploadv3 = async (file, user_id) => {
  const s3client = new S3Client();

  const param = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${user_id}/${uuid()}-${file?.originalname}`,
    Body: file?.buffer,
    ACL: "bucket-owner-full-control",
    ContentType: file?.mimetype,
  };

  const response = await s3client.send(new PutObjectCommand(param));

  return {
    Key: param.Key,
    Location: `https://${param.Bucket}.s3.amazonaws.com/${param.Key}`,
    response,
  };
};


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 2 },
});

exports.upload = upload;
