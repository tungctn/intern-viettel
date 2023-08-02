const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const { v4: uuidv4 } = require("uuid");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-southeast-1",
});
const dynamodb = new AWS.DynamoDB();

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected!`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data, "data");
    io.to(data.room).emit("receive_message", data);
    dynamodb.putItem(
      {
        TableName: "messages",
        Item: {
          id: { S: String(uuidv4()) },
          message: { S: data.message },
          room: { S: data.room },
          senderId: { S: data.author },
          createdAt: { N: Date.now().toString() },
          updatedAt: { N: Date.now().toString() },
        },
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected!", socket.id);
  });
});

module.exports = server;
