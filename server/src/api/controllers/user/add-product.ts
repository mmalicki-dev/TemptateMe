import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { errorHelper, getText } from "../../../utils/index.js";
import { getOnlyShopping } from "./helpers.js";

const addProduct: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyShopping(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    const product = req.body;
    const newProduct = {
      _id: new Types.ObjectId(),
      ingredientId: product.id as string,
      measure: product.measure as string,
      recipeId: product.recipeId as string,
      recipeName: product.recipeName as string,
    };

    user.shoppingList.push(newProduct);
    await user.save();

    res.status(200).json({
      resultMessage: { en: getText("en", "00098") },
      resultCode: "00098",
      newProduct,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default addProduct;

/**
 * @swagger
 * /user/shopping:
 *    post:
 *      summary: Add product
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
 *          description: Successfully created product.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          newProduct:
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
