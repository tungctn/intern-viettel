const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected!`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`Socket ${socket.id} joining room ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    io.to(data.room).emit("receive_message", data); // Updated this line
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected!", socket.id);
  });
});

server.listen(6001, () => {
  console.log("Server is running on port 6001");
});
