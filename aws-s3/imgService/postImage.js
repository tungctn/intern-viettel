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

    // const params = {
    //   Message: JSON.stringify({
    //     user_id: user_id,
    //     url: response?.Location,
    //   }),
    //   TopicArn: process.env.SNS_TOPIC_ARN,
    //   MessageStructure: "json",
    // };
    // sns.publish(
    //   {
    //     Message: JSON.stringify({
    //       default: JSON.stringify({
    //         user_id: user_id,
    //         url: response?.Location,
    //       }),
    //     }),
    //     MessageStructure: "json",
    //     TopicArn: process.env.SNS_TOPIC_ARN,
    //   },
    //   (err, data) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).json({
    //         success: false,
    //         message: "Internal server error",
    //       });
    //     }
    //     console.log(
    //       `Message ${params.Message} sent to the topic ${params.TopicArn}`
    //     );
    //     console.log("MessageID is " + data.MessageId);
    //     return res.status(200).json({
    //       success: true,
    //       message: "Image uploaded successfully",
    //       data,
    //     });
    //   }
    // );
    const url = response?.Location;
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
        return res.status(200).json({
          success: true,
          message: "Image uploaded successfully",
      });
      } else {
        console.log("User not updated");
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    } else {
      console.log("Labels detected: ");
      labels.forEach((label) =>
        console.log(label.Name + ": " + label.Confidence)
      );
      console.log("Unsafe");
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = uploadImage;
