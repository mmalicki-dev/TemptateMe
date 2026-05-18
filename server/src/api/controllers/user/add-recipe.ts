import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { errorHelper, getText } from "../../../utils/index.js";
import { getOnlyRecipes, createRecipeToDb } from "./helpers.js";

const addRecipe: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyRecipes(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    const recipe = req.body;
    if (!recipe) {
      res.status(400).json(errorHelper("00099", req));
      return;
    }

    const defaultUrl = "https://cdn.pixabay.com/photo/2012/04/28/18/16/food-43845_1280.png";
    const newRecipe = createRecipeToDb({ recipe });
    newRecipe.thumb = defaultUrl;
    newRecipe.preview = defaultUrl;
    await newRecipe.save();

    user.createdRecipes.push(new Types.ObjectId(newRecipe.id));
    await user.save();

    res.status(200).json({
      resultMessage: { en: getText("en", "00100") },
      resultCode: "00100",
      recipes: newRecipe,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default addRecipe;

/**
 * @swagger
 * /user/ownRecipe:
 *    post:
 *      summary: Add recipe
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
 *          description: Successfully created recipe.
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
