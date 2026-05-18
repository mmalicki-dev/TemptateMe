import type { RequestHandler } from "express";
import { hash } from "bcryptjs";
import { User } from "../../../models/index.js";
import { validateForgotPassword } from "../../validators/user.validator.js";
import { ok, fail } from "../../../utils/index.js";

const forgotPassword: RequestHandler = async (req, res) => {
  try {
    const { error } = validateForgotPassword(req.body);
    if (error) {
      fail(res, error.details[0].message, 400);
      return;
    }

    const hashed = await hash(req.body.password, 10);

    await User.updateOne(
      { _id: req.user!._id, isVerified: true },
      { $set: { password: hashed } },
    );

    ok(res);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default forgotPassword;
