import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import "./models/dbConnection.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

const PORT = process.env.PORT || 8080;

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:4001";

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/message", messageRoute);

app.get("/", (req, res) => {
  res.send("Hello From Auth Server!");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
