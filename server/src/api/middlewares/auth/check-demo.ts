import type { Request, Response, NextFunction } from "express";
import { User } from "../../../models/index.js";
import { fail } from "../../../utils/index.js";
import { demoUserEmail } from "../../../config/index.js";

export default async function checkDemo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!demoUserEmail || !req.user) {
    next();
    return;
  }

  try {
    const user = await User.findById(req.user._id, "email").lean();
    if (user?.email === demoUserEmail) {
      fail(res, "This action is disabled in demo mode.", 403);
      return;
    }
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
    return;
  }

  next();
}
