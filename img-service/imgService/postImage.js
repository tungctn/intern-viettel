const { s3Uploadv3 } = require("./s3Service");
const User = require("../models/User");
const AWS = require("aws-sdk");
const sns = new AWS.SNS({ region: "ap-southeast-1" });
const rekognition = new AWS.Rekognition({ region: "ap-southeast-1" });

const uploadImage = async (req, res, next) => {
  try {
    const file = req.file;
    const user_id = req.params.id;
    const response = await s3Uploadv3(file, user_id);
    const url = response?.Location;
    const presignedUrl = response?.presignedUrl;
    const bucket = url.split("/")[2].split(".")[0];
    const name = url.split("/")[3] + "/" + url.split("/")[4];
    const params = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: name,
        },
      },
    };

    const moderation = await rekognition
      .detectModerationLabels(params)
      .promise();
    console.log(moderation);
    const labels = moderation.ModerationLabels;
    if (labels.length == 0) {
      console.log("safe");
      return res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        presignedUrl: presignedUrl,
        url,
      });
    } else {
      console.log("Labels detected: ");
      labels.forEach((label) =>
        console.log(label.Name + ": " + label.Confidence)
      );
      console.log("Unsafe");
      return res.status(500).json({
        success: false,
        message: "Image is not safe",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = uploadImage;
