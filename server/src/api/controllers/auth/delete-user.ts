import type { RequestHandler } from "express";
import { User, Token, Recipe } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user!._id;

    const user = await User.findById(userId).select("createdRecipes");
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    await Recipe.deleteMany({ _id: { $in: user.createdRecipes } });
    await Recipe.updateMany({ favorites: userId }, { $pull: { favorites: userId } });
    await Token.deleteOne({ userId });
    await User.deleteOne({ _id: userId });

    logger("00092", userId, getText("en", "00092"), "Info", req);
    res.status(200).json({
      resultMessage: { en: getText("en", "00092"), tr: getText("tr", "00092") },
      resultCode: "00092",
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default deleteUser;

/**
 * @swagger
 * /auth/delete:
 *    delete:
 *      summary: Delete the User
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: Your account was deleted successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
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
