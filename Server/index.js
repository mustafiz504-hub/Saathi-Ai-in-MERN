import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import "./models/dbConnection.js";

const app = express();
const PORT = process.env.PORT || 8080;

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello From Auth Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
