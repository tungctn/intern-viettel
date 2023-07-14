const dynamoose = require("dynamoose");
require("dotenv").config();
const Post = require("./models/Post");
const { v4: uuidv4 } = require("uuid");
const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "ap-southeast-1",
});
const AWS = require("aws-sdk");
const sns = new AWS.SNS({ region: "ap-southeast-1" });

dynamoose.aws.ddb.set(ddb);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

exports.handler = async (event, context) => {
  // sort item in Post table by random

  // SNS publish message to topic
  const params = {
    Message: "List post has been updated",
    MessageStructure: "string",
    TopicArn: process.env.SNS_TOPIC_ARN,
  };
  sns.publish(params, async (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    console.log(
      `Message ${params.Message} sent to the topic ${params.TopicArn}`
    );
    console.log("MessageID is " + data.MessageId);
    const posts = await Post.scan().exec();
    const shuffledPosts = shuffle(posts);
    for (let i = 0; i < posts.length; i++) {
      // delete all items in Post table
      await Post.delete({ id: posts[i].id });
    }
    // create new items in Post table
    for (let i = 0; i < shuffledPosts.length; i++) {
      const post = await Post.create({
        title: shuffledPosts[i].title,
        description: shuffledPosts[i].description,
        url: shuffledPosts[i].url,
        status: shuffledPosts[i].status,
        source: shuffledPosts[i].source,
        userId: shuffledPosts[i].userId,
        id: shuffledPosts[i].id,
      });
    }

    console.log("Post table has been updated");
  });
};
