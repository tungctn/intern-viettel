// translate to dynamoose
const dynamoose = require("dynamoose");
const { Counter, getNextId } = require("./Counter");
const Schema = dynamoose.Schema;
const { v4: uuidv4 } = require("uuid");

const PostSchema = new Schema(
  {
    id: {
      type: String,
      index: true,
      default: uuidv4(),
    },
    title: {
      type: String,
    },
    topic: {
      type: String,
    },
    description: {
      type: String,
    },
    source: {
      type: String,
    },
    url: {
      type: String,
    },
    status: {
      type: String,
      enum: ["TO LEARN", "LEARNING", "LEARNED"],
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = dynamoose.model("posts", PostSchema);
