const dynamoose = require("dynamoose");
const Schema = dynamoose.Schema;
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
