import type { RequestHandler } from "express";
import { Recipe } from "../../../models/index.js";
import { ok, fail } from "../../../utils/index.js";
import { getOnlyRecipes } from "./helpers.js";

const getUsersRecipes: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyRecipes(req.user!._id);
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    const recipes = await Recipe.find({ _id: { $in: user.createdRecipes } });
    ok(res, { recipes });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getUsersRecipes;
