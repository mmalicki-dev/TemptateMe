import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getRecipesFromDbQuery } from './helpers.js';

const getRecipesQuery: RequestHandler = async (req, res) => {
  try {
    const page = Number(req.query.page as string) || undefined;
    const limit = Number(req.query.limit as string) || undefined;
    const query = req.query.query as string | undefined;
    const data = await getRecipesFromDbQuery({ page, limit, query });
    ok(res, data);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getRecipesQuery;
