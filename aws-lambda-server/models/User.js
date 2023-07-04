const dynamoose = require("dynamoose");
const Schema = dynamoose.Schema;
const { v4: uuidv4 } = require("uuid");
const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "ap-southeast-1",
});

dynamoose.aws.ddb.set(ddb);

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
      default: "",
    },
    img: {
      type: String,
      default: "https://i.imgur.com/2FZI8uS.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = dynamoose.model("users", UserSchema);
