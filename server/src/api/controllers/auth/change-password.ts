import type { RequestHandler } from "express";
import { hash, compare } from "bcryptjs";
import { User } from "../../../models/index.js";
import { validateChangePassword } from "../../validators/user.validator.js";
import { ok, fail } from "../../../utils/index.js";

const changePassword: RequestHandler = async (req, res) => {
  try {
    const { error } = validateChangePassword(req.body);
    if (error) {
      fail(res, error.details[0].message, 400);
      return;
    }

    if (req.body.oldPassword === req.body.newPassword) {
      fail(res, "New password must differ from old password.", 400);
      return;
    }

    const user = await User.findById(req.user!._id).select("password");
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    const match = await compare(req.body.oldPassword, user.password);
    if (!match) {
      fail(res, "Old password is incorrect.", 400);
      return;
    }

    user.password = await hash(req.body.newPassword, 10);
    await user.save();

    ok(res);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default changePassword;
