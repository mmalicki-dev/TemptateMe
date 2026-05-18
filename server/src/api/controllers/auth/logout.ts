import type { RequestHandler } from "express";
import { Token } from "../../../models/index.js";
import { ok, fail } from "../../../utils/index.js";

const logout: RequestHandler = async (req, res) => {
  try {
    await Token.updateOne(
      { userId: req.user!._id },
      { $set: { status: false, expiresIn: Date.now() } },
    );

    ok(res);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default logout;
