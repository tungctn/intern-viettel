const { dynamodb } = require("../utils/db.config");
const { convertObject } = require("../utils/object.convert");

class Post {
  constructor(post) {
    this.post = post;
  }

  async getPosts() {
    const params = {
      TableName: "posts",
    };

    const response = await dynamodb.scan(params).promise();
    let posts = [];
    for (const item of response.Items) {
      const element = {};
      for (const key in item) {
        element[key] = item[key][Object.keys(item[key])[0]];
        const userId = item["userId"][Object.keys(item["userId"])[0]];
        const user = await dynamodb
          .scan({
            TableName: "users",
            FilterExpression: "id = :userId",
            ExpressionAttributeValues: {
              ":userId": {
                S: userId,
              },
            },
          })
          .promise();
        element["user"] = convertObject(user.Items[0]);
      }
      posts.push(element);
    }
    return posts;
  }

  async getOwnPosts(userId) {
    const params = {
      TableName: "posts",
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": {
          S: userId,
        },
      },
    };

    const response = await dynamodb.scan(params).promise();
    let posts = [];
    for (const item of response.Items) {
      const element = {};
      for (const key in item) {
        element[key] = item[key][Object.keys(item[key])[0]];
        const userId = item["userId"][Object.keys(item["userId"])[0]];
        const user = await dynamodb
          .scan({
            TableName: "users",
            FilterExpression: "id = :userId",
            ExpressionAttributeValues: {
              ":userId": {
                S: userId,
              },
            },
          })
          .promise();
        element["user"] = convertObject(user.Items[0]);
      }
      posts.push(element);
    }
    return posts;
  }

  createPost() {
    const params = {
      TableName: "posts",
      Item: {
        id: { S: this.post.id },
        content: { S: this.post.content },
        url: { S: this.post.url },
        userId: { S: this.post.userId },
        createdAt: { N: this.post.createdAt.toString() },
        updatedAt: { N: this.post.updatedAt.toString() },
      },
    };
    return dynamodb
      .putItem(params, function (err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
      })
      .promise();
  }

  updatePost(id, post) {
    const params = {
      TableName: "posts",
      Key: {
        id: id,
      },
      UpdateExpression:
        "set content = :content, createdAt = :createdAt, url = :url, userId = :userId, likes = :likes",
      ExpressionAttributeValues: {
        ":content": post.content,
        ":updatedAt": Date.now(),
        ":url": post.url,
        ":userId": post.userId,
        ":likes": post.likes,
      },
    };

    return dynamodb.updateItem(params).promise();
  }

  deletePost(id) {
    const params = {
      TableName: "posts",
      Key: {
        id: id,
      },
    };

    return dynamodb.deleteItem(params).promise();
  }

  likePost(id, userId) {
    const params = {
      TableName: "posts",
      Key: {
        id: id,
      },
      UpdateExpression: "set likes = list_append(likes, :newLike)",
      ExpressionAttributeValues: {
        ":newLike": {
          L: [
            {
              S: userId,
            },
          ],
        },
      },
    };

    return dynamodb.updateItem(params).promise();
  }
}

module.exports = Post;
