import type { RequestHandler } from "express";
import { Token } from "../../../models/index.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";

const logout: RequestHandler = async (req, res) => {
  try {
    await Token.updateOne(
      { userId: req.user!._id },
      { $set: { status: false, expiresIn: Date.now() } },
    );

    logger("00050", req.user!._id, getText("en", "00050"), "Info", req);
    res.status(200).json({
      resultMessage: { en: getText("en", "00050"), tr: getText("tr", "00050") },
      resultCode: "00050",
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default logout;

/**
 * @swagger
 * /auth/logout:
 *    post:
 *      summary: Logout the User
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
 *          description: Successfully logged out.
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
