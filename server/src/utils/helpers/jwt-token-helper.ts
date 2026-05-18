import jwt from "jsonwebtoken";
import { jwtSecretKey, refreshTokenSecretKey } from "../../config/index.js";
import type { Types } from "mongoose";
const { sign } = jwt;

export function signAccessToken(userId: Types.ObjectId): string {
  return sign({ _id: userId }, jwtSecretKey, { expiresIn: "1h" });
}

export function signRefreshToken(userId: Types.ObjectId): string {
  return sign({ _id: userId }, refreshTokenSecretKey, { expiresIn: "7d" });
}

export function signConfirmCodeToken(
  userId: Types.ObjectId,
  confirmCode: string,
): string {
  return sign({ _id: userId, code: confirmCode }, jwtSecretKey, {
    expiresIn: "10m",
  });
}
