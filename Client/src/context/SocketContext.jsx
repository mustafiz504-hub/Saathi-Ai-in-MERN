import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const { authUser } = useAuth();

  useEffect(() => {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      const BACKEND_URL = import.meta.env.PROD ? "https://saathi-ai-in-mern.onrender.com" : "http://127.0.0.1:8080";
      const newSocket = io(BACKEND_URL, {
        query: {
          userId: authUser.user._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("showTyping", ({ senderId }) => {
        setTypingUsers((prev) => ({
          ...prev,
          [senderId]: true,
        }));
      });

      newSocket.on("hideTyping", ({ senderId }) => {
        setTypingUsers((prev) => ({
          ...prev,
          [senderId]: false,
        }));
      });

      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, typingUsers }}>
      {children}
    </SocketContext.Provider>
  );
};