import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "../components/chat/ChatBox";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { ListGroup, Col, Row } from "react-bootstrap";
import { ChatContext } from "../contexts/ChatContext";

const socket = io.connect("http://localhost:6001");

const Chat = () => {
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const {
    authState: { user },
  } = useContext(AuthContext);

  const {
    userState: { users },
    loadUsers,
  } = useContext(UserContext);

  const { getMessages } = useContext(ChatContext);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((oldMsgs) => [...oldMsgs, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser && users.length > 0) {
      setSelectedUser(users[0]);
      handleUserSelect(users[0]);
    }
  }, [selectedUser, users.length]);

  const convert = (a, b) => {
    a = String(a);
    b = String(b);

    const sortedAB = [a, b].sort();

    return sortedAB.join(""); // Ghép hai chuỗi lại sau khi đã sắp xếp
  };

  const handleUserSelect = async (selectedUser) => {
    const roomId = convert(user.id, selectedUser.id);
    socket.emit("join_room", roomId);
    const response = await getMessages(roomId);
    console.log(response);
    const message = response.map((msg) => {
      return {
        room: msg.room,
        author: msg.senderId,
        message: msg.message,
      };
    });
    setMessages(message);
    setRoom(roomId);
    setSelectedUser(selectedUser);
  };

  return (
    <Row>
      <Col md={4}>
        <h3>Users</h3>
        <ListGroup>
          {users?.map((userItem) => (
            <ListGroup.Item
              key={userItem.id}
              action
              onClick={() => handleUserSelect(userItem)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                border: "none",
                borderBottom: "1px solid #f2f2f2",
                backgroundColor:
                  selectedUser && selectedUser.id === userItem.id
                    ? "#f2f2f2"
                    : "transparent",
              }}>
              <div
                className={`d-flex justify-content-start align-items-center`}>
                <img
                  src={userItem.img}
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                  {userItem.firstName} {userItem.lastName}
                </span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={8}>
        <ChatBox
          messages={messages}
          socket={socket}
          user={user}
          room={room}
          selectedUser={selectedUser}
        />
      </Col>
    </Row>
  );
};

export default Chat;
