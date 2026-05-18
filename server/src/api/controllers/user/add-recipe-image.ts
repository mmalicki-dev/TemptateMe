import type { RequestHandler } from "express";
import fs from "node:fs/promises";
import imgbbUploader from "imgbb-uploader";
import { ok, fail } from "../../../utils/index.js";
import { imageApiKey } from "../../../config/index.js";
import { tmpDir } from "../../middlewares/index.js";
import { getRecipeByIdFromDb } from "../recipes/helpers.js";

const addRecipeImage: RequestHandler = async (req, res) => {
  try {
    const recipeId = req.header("recipeId");
    if (!recipeId) {
      fail(res, "Recipe ID is required.", 400);
      return;
    }

    const recipe = await getRecipeByIdFromDb(recipeId);
    if (!recipe) {
      fail(res, "Recipe not found.", 404);
      return;
    }

    if (!req.file) {
      fail(res, "Image not uploaded.", 400);
      return;
    }

    try {
      const image = await imgbbUploader(imageApiKey, `${tmpDir}${req.file.originalname}`);
      recipe.thumb = image.url;
      recipe.preview = image.display_url;
    } catch (uploadErr) {
      fail(res, (uploadErr as Error).message, 400);
      return;
    }

    await recipe.save();

    ok(res, { recipe });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  } finally {
    if (req.file?.path) fs.unlink(req.file.path).catch(() => {});
  }
};

export default addRecipeImage;
