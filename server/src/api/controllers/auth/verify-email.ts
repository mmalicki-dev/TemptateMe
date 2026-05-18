import type { RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { User, Token } from "../../../models/index.js";
import { getText, logger, signRefreshToken } from "../../../utils/index.js";
import ipHelper from "../../../utils/helpers/ip-helper.js";
import { clientUrl, jwtSecretKey } from "../../../config/index.js";

const { verify } = jwt;

const redirect = (res: Response, error: string | null): void => {
  if (error) {
    res.redirect(
      `${clientUrl}/email-verified?error=${encodeURIComponent(error)}`,
    );
    return;
  }
  res.redirect(`${clientUrl}/email-verified?status=success`);
};

const verifyEmail: RequestHandler = async (req, res) => {
  const confirmCodeToken = req.params.confirmCodeToken as string;

  try {
    req.user = verify(confirmCodeToken, jwtSecretKey) as { _id: string };
  } catch (err) {
    redirect(res, (err as Error).message);
    return;
  }

  try {
    const userId = new Types.ObjectId(req.user._id);

    const exists = await User.exists({ _id: userId });
    if (!exists) {
      redirect(res, "User not found.");
      return;
    }

    await User.updateOne({ _id: userId }, { $set: { isVerified: true } });

    const refreshToken = signRefreshToken(userId);

    const token = new Token({
      userId,
      refreshToken,
      status: true,
      expiresIn: Date.now() + 604800000,
      createdAt: Date.now(),
      createdByIp: ipHelper(req),
    });
    await token.save();

    logger("00058", req.user._id, getText("en", "00058"), "Info", req);
    redirect(res, null);
  } catch (err) {
    redirect(res, (err as Error).message);
  }
};

export default verifyEmail;
