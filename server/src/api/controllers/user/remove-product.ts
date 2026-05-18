import type { RequestHandler } from "express";
import { errorHelper, getText } from "../../../utils/index.js";
import { getOnlyShopping } from "./helpers.js";

const removeProduct: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyShopping(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    const productId = req.body.id as string;
    const index = user.shoppingList.findIndex((item) => String(item._id) === productId);

    if (index === -1) {
      res.status(404).json({
        resultMessage: { en: getText("en", "00104") },
        resultCode: "00104",
      });
      return;
    }

    user.shoppingList.splice(index, 1);
    await user.save();

    res.status(200).json({
      resultMessage: { en: getText("en", "00105") },
      resultCode: "00105",
      idProduct: productId,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default removeProduct;

/**
 * @swagger
 * /user/shopping:
 *    delete:
 *      summary: Remove product from shopping list
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        description: An object of a product that is needed to be removed
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
 *      responses:
 *        "200":
 *          description: Successfully removed product.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          idProduct:
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
