import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import io from "socket.io-client";
import { lambdaServerUrl } from "./constants";

const socket = io.connect("http://localhost:6001");

export const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [currentRoom, setCurrentRoom] = useState(null);

  const createMessage = async (message, room) => {
    const response = await axios.post(`${lambdaServerUrl}/messages/${room}`, {
      message: message,
    });
    return response.data;
  };

  const getMessages = async (room) => {
    const response = await axios.get(`${lambdaServerUrl}/messages/${room}`);
    return response.data.messages;
  };

  const value = {
    socket,
    userName,
    setUserName,
    setCurrentRoom,
    currentRoom,
    createMessage,
    getMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
