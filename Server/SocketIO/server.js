import "dotenv/config";
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:4001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//real time message
export const getRecieverSocketId = (receiverId) => {
  return users[receiverId];
};

// userId: socketId
const users = {};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    console.log("Online Users:", users);
  }

  // sabko online users bhejo
  io.emit("getOnlineUsers", Object.keys(users));

  // typing event
  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = users[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("showTyping", { senderId });
    }
  });

  // stop typing event
  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const receiverSocketId = users[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("hideTyping", { senderId });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    if (userId) {
      delete users[userId];
      io.emit("getOnlineUsers", Object.keys(users));
    }
  });
});

export { app, server, io };
