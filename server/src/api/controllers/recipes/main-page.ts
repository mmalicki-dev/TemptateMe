import type { RequestHandler } from 'express';
import { errorHelper, getText } from '../../../utils/index.js';
import { getRecipesFromDbCategory } from './helpers.js';

const getRecipesMainPage: RequestHandler = async (req, res) => {
  try {
    const categories = ['Breakfast', 'Miscellaneous', 'Chicken', 'Dessert'];
    const recipes = await Promise.all(
      categories.map(async (category) => {
        const response = await getRecipesFromDbCategory({ limit: 4, category });
        return { category, ...response };
      }),
    );
    res.status(200).json({
      resultMessage: { en: getText('en', '00094') },
      resultCode: '00094',
      recipes,
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default getRecipesMainPage;

/**
 * @swagger
 * /recipes/main-page:
 *    get:
 *      summary: Fetch recipes for main page.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Recipes
 *      responses:
 *        "200":
 *          description: You sucessfully fetched recipes.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          recipes:
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
