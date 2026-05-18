import type { RequestHandler } from 'express';
import { errorHelper, getText } from '../../../utils/index.js';
import { getIngredientByIdFromDb } from './helpers.js';

const getIngredientById: RequestHandler = async (req, res) => {
  try {
    const ingredient = await getIngredientByIdFromDb(req.params.id as string);
    res.status(200).json({
      resultMessage: { en: getText('en', '00095') },
      resultCode: '00095',
      ingredient,
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default getIngredientById;
