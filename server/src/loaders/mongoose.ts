import mongoose from "mongoose";
import { dbUri } from "../config/index.js";

export default async function mongooseLoader(): Promise<void> {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(dbUri, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
