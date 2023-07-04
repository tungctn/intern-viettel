const AWS = require("aws-sdk");
const rekognition = new AWS.Rekognition({ region: "ap-southeast-1" });

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
    MaxLabels: 10,
    MinConfidence: 70,
  };

  // moderation
  const moderation = await rekognition.detectModerationLabels(params).promise();
  console.log(moderation);
  const labels = moderation.ModerationLabels;
  const labelNames = labels.map((label) => label.Name);
  console.log(labelNames);
  const isSafe = labelNames.includes("Explicit Nudity");
  console.log(isSafe);
};
