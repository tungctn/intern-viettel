import React, { useState } from "react";
import "./ChatBox.css";
import { Image } from "react-bootstrap";

const ChatBox = ({ socket, user, room, messages }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: `${user.firstName} ${user.lastName}`,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-row ${
              msg.author === `${user.firstName} ${user.lastName}`
                ? "you-message"
                : "other-message"
            }`}>
            {msg.author !== `${user.firstName} ${user.lastName}` && (
              <Image src={user?.img} roundedCircle className="chat-image" />
            )}
            <p className="message-content">{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          className="chat-input"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          value={currentMessage}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
