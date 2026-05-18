import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getIngredientByIdFromDb } from './helpers.js';

const getIngredientById: RequestHandler = async (req, res) => {
  try {
    const ingredient = await getIngredientByIdFromDb(req.params.id as string);
    ok(res, { ingredient });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getIngredientById;
