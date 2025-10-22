import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`Connection to DB established at ${conn.connection.host}`);
  } catch (e: any) {
    console.warn("Error connecting to DB: ", e);
  }
};
