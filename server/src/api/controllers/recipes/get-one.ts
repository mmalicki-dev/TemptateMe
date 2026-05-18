import type { RequestHandler } from 'express';
import { errorHelper, getText } from '../../../utils/index.js';
import { getRecipeByIdFromDb } from './helpers.js';

const getRecipeById: RequestHandler = async (req, res) => {
  try {
    const recipe = await getRecipeByIdFromDb(req.params.recipeId as string);
    if (!recipe) {
      res.status(404).json(errorHelper('00008', req));
      return;
    }
    res.status(200).json({
      resultMessage: { en: getText('en', '00094') },
      resultCode: '00094',
      recipe,
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default getRecipeById;

/**
 * @swagger
 * /recipes:
 *    get:
 *      summary: Fetch one recipe by id.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *        - in: query
 *          name: recipeId
 *          schema:
 *            type: string
 *          description: Put recipeId here
 *      tags:
 *        - Recipes
 *      responses:
 *        "200":
 *          description: You sucessfully fetched one recipe.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          recipe:
 *                              type: object
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
