import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Token } from "../../../models/index.js";
import { validateRefreshToken } from "../../validators/user.validator.js";
import { ok, fail, ipHelper, signAccessToken, signRefreshToken } from "../../../utils/index.js";
import { refreshTokenSecretKey } from "../../../config/index.js";

const { verify } = jwt;

const refreshToken: RequestHandler = async (req, res) => {
  try {
    const { error } = validateRefreshToken(req.body);
    if (error) {
      fail(res, "Refresh token is required.", 400);
      return;
    }

    let decoded: { _id: string };
    try {
      decoded = verify(req.body.refreshToken, refreshTokenSecretKey) as { _id: string };
    } catch (err) {
      fail(res, "Token verification failed.", 401);
      return;
    }

    req.user = decoded;
    const userId = new Types.ObjectId(decoded._id);

    const userToken = await Token.findOne({ userId });
    if (!userToken || userToken.refreshToken !== req.body.refreshToken) {
      fail(res, "Token does not match.", 401);
      return;
    }

    if (userToken.expiresIn.getTime() <= Date.now() || !userToken.status) {
      fail(res, "Session expired, please log in again.", 401);
      return;
    }

    const newAccessToken = signAccessToken(userId);
    const newRefreshToken = signRefreshToken(userId);

    await Token.updateOne(
      { userId },
      {
        $set: {
          refreshToken: newRefreshToken,
          createdByIp: ipHelper(req),
          createdAt: Date.now(),
          expiresIn: Date.now() + 604800000,
          status: true,
        },
      },
    );

    ok(res, { accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default refreshToken;
