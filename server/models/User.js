// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("users", UserSchema);

// translate to dynamoose
const dynamoose = require("dynamoose");
const Schema = dynamoose.Schema;
const { Counter, getNextId } = require("./Counter");
// const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new Schema(
  {
    id: {
      type: String,
      index: true,
      default: uuidv4(),
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = dynamoose.model("users", UserSchema);
