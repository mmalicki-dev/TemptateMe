import type { RequestHandler } from "express";
import fs from "node:fs/promises";
import imgbbUploader from "imgbb-uploader";
import { ok, fail } from "../../../utils/index.js";
import { imageApiKey } from "../../../config/index.js";
import { tmpDir } from "../../middlewares/index.js";
import { getUserById } from "./helpers.js";

const updateUserAvatar: RequestHandler = async (req, res) => {
  try {
    const user = await getUserById(req.user!._id);
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    if (!req.file) {
      fail(res, "Image not uploaded.", 400);
      return;
    }

    try {
      const image = await imgbbUploader(imageApiKey, `${tmpDir}${req.file.originalname}`);
      user.photoUrl = image.url;
    } catch (uploadErr) {
      fail(res, (uploadErr as Error).message, 400);
      return;
    }

    await user.save();

    ok(res, { user });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  } finally {
    if (req.file?.path) fs.unlink(req.file.path).catch(() => {});
  }
};

export default updateUserAvatar;
