import type { RequestHandler } from "express";
import fs from "node:fs/promises";
import imgbbUploader from "imgbb-uploader";
import { errorHelper, getText } from "../../../utils/index.js";
import { imageApiKey } from "../../../config/index.js";
import { tmpDir } from "../../middlewares/index.js";
import { getRecipeByIdFromDb } from "../recipes/helpers.js";

const addRecipeImage: RequestHandler = async (req, res) => {
  try {
    const recipeId = req.header("recipeId");
    if (!recipeId) {
      res.status(400).json(errorHelper("00008", req));
      return;
    }

    const recipe = await getRecipeByIdFromDb(recipeId);
    if (!recipe) {
      res.status(404).json(errorHelper("00008", req));
      return;
    }

    if (!req.file) {
      res.status(400).json(errorHelper("00008", req, "Image not uploaded."));
      return;
    }

    try {
      const image = await imgbbUploader(imageApiKey, `${tmpDir}${req.file.originalname}`);
      recipe.thumb = image.url;
      recipe.preview = image.display_url;
    } catch (uploadErr) {
      res.status(400).json(errorHelper("00008", req, (uploadErr as Error).message));
      return;
    }

    await recipe.save();

    res.status(200).json({
      resultMessage: { en: getText("en", "00100") },
      resultCode: "00100",
      recipes: recipe,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  } finally {
    if (req.file?.path) fs.unlink(req.file.path).catch(() => {});
  }
};

export default addRecipeImage;
