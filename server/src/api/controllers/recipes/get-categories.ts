import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getCategoriesFromDb } from './helpers.js';

const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await getCategoriesFromDb();
    ok(res, { categories });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getCategories;
