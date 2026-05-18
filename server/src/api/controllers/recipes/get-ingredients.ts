import type { RequestHandler } from 'express';
import { errorHelper, getText } from '../../../utils/index.js';
import { getAllIngredientsFromDb } from './helpers.js';

const getAllIngredients: RequestHandler = async (req, res) => {
  try {
    const ingredients = await getAllIngredientsFromDb();
    res.status(200).json({
      resultMessage: { en: getText('en', '00095') },
      resultCode: '00095',
      ingredients,
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default getAllIngredients;

/**
 * @swagger
 * /recipes/ingredients:
 *    get:
 *      summary: Fetch ingredients list.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Ingredients
 *      responses:
 *        "200":
 *          description: You sucessfully fetched ingredients.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          ingredients:
 *                              type: array
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
