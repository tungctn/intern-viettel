import React, { useContext, useState } from "react";
import "./ChatBox.css";
import { Image } from "react-bootstrap";
import { ChatContext } from "../../contexts/ChatContext";
import EmojiPicker from "emoji-picker-react";

const ChatBox = ({ socket, user, room, messages, selectedUser }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to control emoji picker
  const { createMessage } = useContext(ChatContext);
  const sendMessage = async () => {
    console.log(user.id);

    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: `${user.id}`,
        message: currentMessage,
      };
      socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    console.log(emoji.emoji);
    setCurrentMessage(currentMessage + emoji.emoji);
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
          const isCurrentUser = msg.author === user.id;
          return (
            <div
              key={idx}
              className={`message-row ${
                isCurrentUser ? "you-message" : "other-message"
              }`}>
              {!isCurrentUser && (
                <Image
                  src={selectedUser?.img}
                  roundedCircle
                  className="chat-image"
                />
              )}
              <p
                className={`message-content ${
                  isCurrentUser
                    ? "you-message-content"
                    : "other-message-content"
                }`}>
                {msg.message}
              </p>
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
        {/* Add a button to toggle emoji picker */}
        <button
          style={{ border: "none", fontSize: "20px" }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😆
        </button>
        <button className="chat-button" onClick={sendMessage}>
          Send
        </button>
      </div>
      {/* Render the emoji picker */}
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiSelect}
          lazyLoadEmojis={true}
          searchPlaceHolder="Emoji"
        />
      )}
    </div>
  );
};

export default ChatBox;
