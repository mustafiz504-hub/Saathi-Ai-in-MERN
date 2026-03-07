import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ensure env load ho

console.log("ENV DB_URL:", process.env.DB_URL);

mongoose
  .connect(process.env.DB_URL, {
    dbName: "SaathiAi-Chat-App", // force kar rahe hain
  })
  .then(() => {
    console.log("MongoDB Connected ✅");
    console.log("Connected Database Name 👉", mongoose.connection.name);
    console.log("Full Connection Host 👉", mongoose.connection.host);
  })
  .catch((err) => {
    console.log("MongoDB Connection Error ❌", err);
  });

export default mongoose;
