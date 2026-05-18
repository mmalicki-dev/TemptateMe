import type { RequestHandler } from 'express';
import { errorHelper, getText } from '../../../utils/index.js';
import { addToFavoritesInDb } from './helpers.js';

const addToFavorites: RequestHandler = async (req, res) => {
  try {
    await addToFavoritesInDb({ userId: req.user!._id, recipeId: req.params.recipeId as string });
    res.status(200).json({
      resultMessage: { en: getText('en', '00096') },
      resultCode: '00096',
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default addToFavorites;

/**
 * @swagger
 * /recipes/favorites:
 *    post:
 *      summary: Add recipe to favorites
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
 *          description: Put recipe id
 *      tags:
 *        - Recipes
 *      responses:
 *        "200":
 *          description: You sucessfully added recipe to favorites.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
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
