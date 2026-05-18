import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getFavoritesRecipes } from './helpers.js';

const getFavorites: RequestHandler = async (req, res) => {
  try {
    const page = Number(req.query.page as string) || undefined;
    const limit = Number(req.query.limit as string) || undefined;
    const data = await getFavoritesRecipes({ userId: req.user!._id, page, limit });
    ok(res, data);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getFavorites;
