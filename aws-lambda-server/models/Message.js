const { dynamodb } = require("../utils/db.config");
const { convertObject } = require("../utils/object.convert");
const { v4: uuidv4 } = require("uuid");

class Message {
  constructor(message) {
    this.message = message;
  }

  getMessages() {}

  async getMessagesByRoom(room) {
    const params = {
      TableName: "messages",
      FilterExpression: "room = :room",
      ExpressionAttributeValues: {
        ":room": {
          S: room,
        },
      },
    };

    const response = await dynamodb.scan(params).promise();
    let messages = [];
    for (const item of response.Items) {
      const element = { ...convertObject(item) };
      messages.push(element);
    }

    return messages.sort((a, b) => a.createdAt - b.createdAt);
  }

  async createMessage(message) {
    try {
      const params = {
        TableName: "messages",
        Item: {
          id: { S: String(uuidv4()) },
          message: { S: message.message },
          room: { S: message.room },
          senderId: { S: message.senderId },
          createdAt: { N: Date.now().toString() },
          updatedAt: { N: Date.now().toString() },
        },
      };

      const response = await dynamodb.putItem(params).promise();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

module.exports = Message;
