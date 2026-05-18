import type { RequestHandler } from "express";
import { Recipe } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { getOnlyRecipes } from "./helpers.js";

const getUsersRecipes: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyRecipes(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    const recipes = await Recipe.find({ _id: { $in: user.createdRecipes } });
    res.status(200).json({
      resultMessage: { en: getText("en", "00094") },
      resultCode: "00094",
      recipes,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default getUsersRecipes;

/**
 * @swagger
 * /user/ownRecipes:
 *    get:
 *      summary: Fetch users created recipes
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Successfully fetched recipes.
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
