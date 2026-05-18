import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { ok, fail } from "../../../utils/index.js";
import { getOnlyRecipes, createRecipeToDb } from "./helpers.js";

const addRecipe: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyRecipes(req.user!._id);
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    const recipe = req.body;
    if (!recipe) {
      fail(res, "Recipe data is required.", 400);
      return;
    }

    const defaultUrl =
      "https://cdn.pixabay.com/photo/2012/04/28/18/16/food-43845_1280.png";
    const newRecipe = await createRecipeToDb({ recipe });
    newRecipe.thumb = defaultUrl;
    newRecipe.preview = defaultUrl;
    await newRecipe.save();

    user.createdRecipes.push(new Types.ObjectId(newRecipe.id));
    await user.save();

    ok(res, { recipe: newRecipe });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default addRecipe;
