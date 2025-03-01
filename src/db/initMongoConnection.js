import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async () => {
  const MONGO_URI = getEnvVar("MONGO_URI");
  await mongoose.connect(MONGO_URI);
  console.log("Database connected");
};
