import type { Request } from "express";
import { Types } from "mongoose";
import { Log } from "../models/index.js";
import ipHelper from "./helpers/ip-helper.js";

export default async function logger(
  code: string,
  userId: string,
  errorMessage: string,
  level: string,
  req: Request | string,
): Promise<void> {
  const ip = req === "" ? "no-ip" : ipHelper(req as Request);
  const log = new Log({ resultCode: code, level, errorMessage, ip });
  if (userId) log.userId = new Types.ObjectId(userId);
  await log.save().catch((err: Error) => {
    console.error("Logging failed: " + err.message);
  });
}
