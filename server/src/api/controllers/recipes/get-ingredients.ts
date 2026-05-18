import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getAllIngredientsFromDb } from './helpers.js';

const getAllIngredients: RequestHandler = async (req, res) => {
  try {
    const ingredients = await getAllIngredientsFromDb();
    ok(res, { ingredients });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getAllIngredients;
