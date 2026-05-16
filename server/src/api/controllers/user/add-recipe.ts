import { getText } from "../../../utils/index.js";
import { getOnlyRecipes } from "./helpers.js";
import { createRecipeToDb } from "./helpers.js";
import { Types } from "mongoose";

async function addRecipe(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMessage: { en: getText("en", "00017") },
        resultCode: "00017",
      });
    const user = await getOnlyRecipes(id);
    if (!user) {
      return res.status(401).json({
        resultMessage: { en: getText("en", "00052") },
        resultCode: "00052",
      });
    }
    const recipe = req.body;
    if (!recipe) {
      return res.status(401).json({
        resultMessage: { en: getText("en", "00099") },
        resultCode: "00099",
      });
    }
    const newRecipe = await createRecipeToDb({ recipe });
    if (!newRecipe) {
      return next({
        resultMessage: { en: getText("en", "00108") },
        resultCode: "00108",
      });
    }

    const url =
      "https://cdn.pixabay.com/photo/2012/04/28/18/16/food-43845_1280.png";

    newRecipe.thumb = url;
    newRecipe.preview = url;

    await newRecipe.save();
    user.createdRecipes.push(new Types.ObjectId(newRecipe.id));
    await user.save();
    return res.status(200).json({
      resultMessage: { en: getText("en", "00100") },
      resultCode: "00100",
      recipes: newRecipe,
    });
  } catch (error) {
    return next(error);
  }
}

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
 *          description: Successfully created recpie.
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
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 */
