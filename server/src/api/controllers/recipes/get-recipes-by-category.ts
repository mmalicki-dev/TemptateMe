import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getRecipesFromDbCategory } from './helpers.js';

const getRecipesByCategory: RequestHandler = async (req, res) => {
  try {
    const page = Number(req.query.page as string) || undefined;
    const limit = Number(req.query.limit as string) || undefined;
    const category = req.params.category as string;
    const data = await getRecipesFromDbCategory({ page, limit, category });
    ok(res, data);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getRecipesByCategory;
