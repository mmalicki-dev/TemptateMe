import type { RequestHandler } from 'express';
import { ok, fail } from '../../../utils/index.js';
import { getRecipesFromDbCategory } from './helpers.js';

const getRecipesMainPage: RequestHandler = async (req, res) => {
  try {
    const categories = ['Breakfast', 'Miscellaneous', 'Chicken', 'Dessert'];
    const recipes = await Promise.all(
      categories.map(async (category) => {
        const data = await getRecipesFromDbCategory({ limit: 4, category });
        return { category, ...data };
      }),
    );
    ok(res, { recipes });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getRecipesMainPage;
