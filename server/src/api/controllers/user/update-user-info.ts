import type { RequestHandler } from "express";
import { User } from "../../../models/index.js";
import { ok, fail } from "../../../utils/index.js";
import { getUserById } from "./helpers.js";

const updateUserInfo: RequestHandler = async (req, res) => {
  try {
    const user = await getUserById(req.user!._id);
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    if (req.body.name) user.name = req.body.name;

    if (req.body.username && req.body.username !== user.username) {
      const exist = await User.exists({ username: req.body.username });
      if (exist) {
        fail(res, "Username already taken.", 400);
        return;
      }
      user.username = req.body.username;
    }

    await user.save();

    ok(res, { user });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default updateUserInfo;
