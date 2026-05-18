import type { RequestHandler } from 'express';
import { errorHelper, getText } from '../../../utils/index.js';
import { deleteFromFavoritesInDb } from './helpers.js';

const deleteFromFavorites: RequestHandler = async (req, res) => {
  try {
    const recipeId = req.params.recipeId as string;
    await deleteFromFavoritesInDb({ userId: req.user!._id, recipeId });
    res.status(200).json({
      resultMessage: { en: getText('en', '00097') },
      resultCode: '00097',
      recipeId,
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default deleteFromFavorites;

/**
 * @swagger
 * /recipes/favorites:
 *    delete:
 *      summary: Delete recipe from favorites
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
 *          description: You sucessfully removed recipe from favorites.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          recipeId:
 *                              type: string
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
