require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dynamoose = require("dynamoose");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.j0fcc.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
//       {
//         useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//       }
//     );

//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

// connectDB();

const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: "us-east-1",
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

// const PORT = process.env.PORT || 5000;

app.listen(3001, () => console.log(`Server started on port ${3001}`));
