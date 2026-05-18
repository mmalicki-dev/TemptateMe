import type { Express } from "express";
import mongooseLoader from "./mongoose.js";
import expressLoader from "./express.js";

export default async function loader(app: Express): Promise<void> {
  await mongooseLoader();
  expressLoader(app);
}
