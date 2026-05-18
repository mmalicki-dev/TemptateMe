import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getRecipeByIdFromDb } from './helpers.js';

const getRecipeById: RequestHandler = async (req, res) => {
  try {
    const recipe = await getRecipeByIdFromDb(req.params.recipeId as string);
    if (!recipe) {
      fail(res, "Recipe not found.", 404);
      return;
    }
    ok(res, { recipe });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getRecipeById;
