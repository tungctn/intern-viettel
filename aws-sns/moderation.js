const AWS = require("aws-sdk");
const rekognition = new AWS.Rekognition({ region: "ap-southeast-1" });
const User = require("./models/User");
const axios = require("axios");

exports.handler = async (event, context) => {
  const url = JSON.parse(event.Records[0].Sns.Message).url;
  const user_id = JSON.parse(event.Records[0].Sns.Message).user_id;

  const bucket = url.split("/")[2].split(".")[0];
  const name = url.split("/")[3] + "/" + url.split("/")[4];

  // rekognition
  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: name,
      },
    },
  };

  // moderation
  const moderation = await rekognition.detectModerationLabels(params).promise();
  console.log(moderation);
  const labels = moderation.ModerationLabels;
  if (labels.length == 0) {
    console.log("safe");
    const user = await User.update(
      {
        id: user_id,
      },
      {
        img: url,
      }
    );
    // check if user is updated
    if (user) {
      console.log("User updated");
    } else {
      console.log("User not updated");
    }
  } else {
    console.log("Labels detected: ");
    labels.forEach((label) =>
      console.log(label.Name + ": " + label.Confidence)
    );
    console.log("Unsafe");
  }
};
