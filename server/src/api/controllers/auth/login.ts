import type { RequestHandler } from "express";
import { compare } from "bcryptjs";
import { User, Token } from "../../../models/index.js";
import { validateLogin } from "../../validators/user.validator.js";
import { ok, fail, signAccessToken, signRefreshToken } from "../../../utils/index.js";

const login: RequestHandler = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      fail(res, error.details[0].message, 400);
      return;
    }

    const user = await User.findOne({ email: req.body.email, isVerified: true }).select("+password");
    if (!user) {
      fail(res, "Invalid email or password.", 401);
      return;
    }

    const match = await compare(req.body.password, user.password);
    if (!match) {
      fail(res, "Invalid email or password.", 401);
      return;
    }

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    await Token.updateOne(
      { userId: user._id },
      { $set: { refreshToken, status: true, expiresIn: Date.now() + 604800000, createdAt: Date.now() } },
    );

    ok(res, { user, accessToken, refreshToken });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default login;
