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
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = dynamoose.model("users", UserSchema);
