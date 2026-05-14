import { getText } from "../../../utils/index.js";
import { imageApiKey } from "../../../config/index.js";
import fs from "fs/promises";
import { tmpDir } from "../../middlewares/index.js";
import imgbbUploader from "imgbb-uploader";
import { getRecipeByIdFromDb } from "../recipes/helpers.js";

async function addRecipeImage(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMessage: { en: getText("en", "00017") },
        resultCode: "00017",
      });

    const recipeId = req.header("recipeId");
    const recipe = await getRecipeByIdFromDb(recipeId);
    if (!recipe) {
      return next({
        resultMessage: { en: getText("en", "00108") },
        resultCode: "00108",
      });
    }

    const fileName = req.file.originalname;

    const image = await imgbbUploader(
      imageApiKey,
      `${tmpDir}${fileName}`
    ).catch((error) =>
      res.status(400).json({
        resultMessage: "Something went wrong",
        resultCode: "00000",
        error: error.message,
      })
    );

    if (image) {
      recipe.thumb = image.url;
      recipe.preview = image.display_url;
    }

    await recipe.save();

    return res.status(200).json({
      resultMessage: { en: getText("en", "00100") },
      resultCode: "00100",
      recipes: recipe,
    });
  } catch (error) {
    return next(error);
  } finally {
    fs.unlink(`${req.file.path}`);
  }
}

export default addRecipeImage;
