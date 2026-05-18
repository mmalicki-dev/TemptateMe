import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { addToFavoritesInDb } from './helpers.js';

const addToFavorites: RequestHandler = async (req, res) => {
  try {
    await addToFavoritesInDb({ userId: req.user!._id, recipeId: req.params.recipeId as string });
    ok(res);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default addToFavorites;
