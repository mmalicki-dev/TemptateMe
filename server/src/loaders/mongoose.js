import mongoose from "mongoose";

import { dbUri } from "../config/index.js";

const dataBase = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(dbUri, {})
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

export default dataBase;
