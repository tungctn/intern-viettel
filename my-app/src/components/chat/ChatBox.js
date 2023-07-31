import React, { useContext, useState } from "react";
import "./ChatBox.css";
import { Image } from "react-bootstrap";
import { ChatContext } from "../../contexts/ChatContext";

const ChatBox = ({ socket, user, room, messages, selectedUser }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { createMessage } = useContext(ChatContext);
  const sendMessage = async () => {
    console.log(user.id);

    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: `${user.id}`,
        message: currentMessage,
      };
      const response = await createMessage(
        messageData.message,
        messageData.room
      );
      if (response.success) {
        console.log("Message sent");
        socket.emit("send_message", messageData);
      }
      setCurrentMessage("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className={`chat-header `}>
        <p className="m-0 ml-2">
          {" "}
          <Image src={selectedUser?.img} roundedCircle className="chat-image" />
          {`${selectedUser?.firstName} ${selectedUser?.lastName}`}
        </p>
      </div>
      <div className="chat-body">
        {messages.map((msg, idx) => {
          return (
            <div
              key={idx}
              className={`message-row ${
                msg.author === user.id ? "you-message" : "other-message"
              }`}>
              {msg.author !== user.id && (
                <Image src={user?.img} roundedCircle className="chat-image" />
              )}
              <p className="message-content">{msg.message}</p>
            </div>
          );
        })}
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
