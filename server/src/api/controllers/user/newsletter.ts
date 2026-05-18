import type { RequestHandler } from "express";
import { User } from "../../../models/index.js";
import { ok, fail } from "../../../utils/index.js";

const newsletter: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    if (user.newsletter) {
      fail(res, "Already subscribed to newsletter.", 400);
      return;
    }

    user.newsletter = true;
    await user.save();

    ok(res);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default newsletter;
