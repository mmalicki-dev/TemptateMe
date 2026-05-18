import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { User } from "../../../models/index.js";
import { ok, fail } from "../../../utils/index.js";
import { deleteRecipeInDb } from "./helpers.js";

const removeRecipe: RequestHandler = async (req, res) => {
  try {
    const recipeId = req.params.recipeId as string;

    await Promise.all([
      User.updateOne(
        { _id: req.user!._id },
        { $pull: { createdRecipes: new Types.ObjectId(recipeId) } },
      ),
      deleteRecipeInDb(recipeId),
    ]);

    ok(res, { recipeId });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default removeRecipe;
