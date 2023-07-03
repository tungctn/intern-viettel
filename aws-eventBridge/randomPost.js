const dynamoose = require("dynamoose");
const Post = require("./models/Post");
const { v4: uuidv4 } = require("uuid");
const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "ap-southeast-1",
});

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
};
