import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "../components/chat/ChatBox";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

const socket = io.connect("http://localhost:6001");

const Chat = () => {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const {
    authState: { user },
  } = useContext(AuthContext);

  const {
    userState: { users, loadUsers },
  } = useContext(UserContext);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((oldMsgs) => [...oldMsgs, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setMessages([]);
    }
  };

  return (
    <div>
      <h3>Join a Chat Room</h3>
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => {
          setRoom(event.target.value);
          console.log(room);
        }}
      />
      <button onClick={joinRoom}>Join room</button>

      <ChatBox messages={messages} socket={socket} user={user} room={room} />
    </div>
  );
};

export default Chat;
