import type { RequestHandler } from 'express';
import { errorHelper, getText } from '../../../utils/index.js';
import { getCategoriesFromDb } from './helpers.js';

const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await getCategoriesFromDb();
    res.status(200).json({
      resultMessage: { en: getText('en', '00093') },
      resultCode: '00093',
      categories,
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default getCategories;

/**
 * @swagger
 * /recipes/category-list:
 *    get:
 *      summary: Fetch category list.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Categories
 *      responses:
 *        "200":
 *          description: You sucessfully fetched categories.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          categories:
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
