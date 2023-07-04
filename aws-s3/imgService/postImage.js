const { s3Uploadv3 } = require("./s3Service");
const User = require("../models/User");
const AWS = require("aws-sdk");
const sns = new AWS.SNS({ region: "ap-southeast-1" });

const uploadImage = async (req, res, next) => {
  try {
    const file = req.file;
    const user_id = req.params.id;
    const response = await s3Uploadv3(file, user_id);

    const params = {
      Message: JSON.stringify({
        user_id: user_id,
        url: response?.Location,
      }),
      TopicArn: process.env.SNS_TOPIC_ARN,
      MessageStructure: "json",
    };
    sns.publish(
      {
        Message: JSON.stringify({
          default: JSON.stringify({
            user_id: user_id,
            url: response?.Location,
          }),
        }),
        MessageStructure: "json",
        TopicArn: process.env.SNS_TOPIC_ARN,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
        console.log(
          `Message ${params.Message} sent to the topic ${params.TopicArn}`
        );
        console.log("MessageID is " + data.MessageId);
        return res.status(200).json({
          success: true,
          message: "Image uploaded successfully",
          data,
        });
      }
    );
  } catch (error) {}
};

module.exports = uploadImage;
