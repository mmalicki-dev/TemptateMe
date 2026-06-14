import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { User, Token } from "../../../models/index.js";
import { fail } from "../../../utils/index.js";
import { jwtSecretKey } from "../../../config/index.js";

const { verify } = jwt;

export default async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let token = req.header("Authorization");
  if (!token) {
    fail(res, "Access denied. No token provided.", 401);
    return;
  }

  if (token.includes("Bearer")) token = token.replace("Bearer ", "");

  try {
    req.user = verify(token, jwtSecretKey) as { _id: string };
  } catch {
    fail(res, "Invalid token.", 401);
    return;
  }

  if (!Types.ObjectId.isValid(req.user._id)) {
    fail(res, "Invalid user id.", 400);
    return;
  }

  try {
    const exists = await User.exists({ _id: req.user._id, isVerified: true });
    if (!exists) {
      fail(res, "User not found or not verified.", 401);
      return;
    }
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
    return;
  }

  try {
    const tokenExists = await Token.exists({ userId: req.user._id, status: true });
    if (!tokenExists) {
      fail(res, "Session expired, please log in again.", 401);
      return;
    }
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
    return;
  }

  next();
}
