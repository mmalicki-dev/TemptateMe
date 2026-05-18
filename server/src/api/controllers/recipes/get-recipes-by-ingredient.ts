import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getRecipesFromDbIngredient } from './helpers.js';

const getRecipesByIngredient: RequestHandler = async (req, res) => {
  try {
    const page = Number(req.query.page as string) || undefined;
    const limit = Number(req.query.limit as string) || undefined;
    const ingredientId = req.params.ingredientId as string;
    const data = await getRecipesFromDbIngredient({ page, limit, ingredientId });
    ok(res, data);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getRecipesByIngredient;
