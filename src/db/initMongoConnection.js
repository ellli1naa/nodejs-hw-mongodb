import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function initMongoConnection = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`
    )
    .then(() => {
      console.log("Mongo connection successfully established!");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};