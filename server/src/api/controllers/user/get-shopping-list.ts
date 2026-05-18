import type { RequestHandler } from "express";
import { errorHelper, getText } from "../../../utils/index.js";
import { getOnlyShopping } from "./helpers.js";

const getShoppingList: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyShopping(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    res.status(200).json({
      resultMessage: { en: getText("en", "00101") },
      resultCode: "00101",
      shoppingList: user.shoppingList,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default getShoppingList;

/**
 * @swagger
 * /user/shopping:
 *    get:
 *      summary: Fetch users shopping list
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
 *          description: Successfully fetched shopping list.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          shoppingList:
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
