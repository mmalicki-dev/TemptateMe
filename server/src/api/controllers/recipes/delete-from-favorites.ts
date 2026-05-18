import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { deleteFromFavoritesInDb } from './helpers.js';

const deleteFromFavorites: RequestHandler = async (req, res) => {
  try {
    const recipeId = req.params.recipeId as string;
    await deleteFromFavoritesInDb({ userId: req.user!._id, recipeId });
    ok(res, { recipeId });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default deleteFromFavorites;
