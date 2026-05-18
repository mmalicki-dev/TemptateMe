import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { User } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { deleteRecipeInDb } from "./helpers.js";

const removeRecipe: RequestHandler = async (req, res) => {
  try {
    const recipeId = req.params.recipeId as string;

    await Promise.all([
      User.updateOne(
        { _id: req.user!._id },
        { $pull: { createdRecipes: new Types.ObjectId(recipeId) } },
      ),
      deleteRecipeInDb(recipeId),
    ]);

    res.status(200).json({
      resultMessage: { en: getText("en", "00107") },
      resultCode: "00107",
      recipeId,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default removeRecipe;

/**
 * @swagger
 * /user/ownRecipe:
 *    delete:
 *      summary: Remove created recipe.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        description: An id of recipe
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *      tags:
 *        - User
 *        - Recipes
 *      responses:
 *        "200":
 *          description: Successfully removed recipe.
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
