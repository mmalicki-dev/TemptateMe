import type { RequestHandler } from "express";
import { User } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

const newsletter: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    if (user.newsletter) {
      res.status(400).json({
        resultMessage: { en: getText("en", "00109") },
        resultCode: "00109",
      });
      return;
    }

    user.newsletter = true;
    await user.save();

    res.status(200).json({
      resultMessage: { en: getText("en", "00110") },
      resultCode: "00110",
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default newsletter;

/**
 * @swagger
 * /user/subscribe:
 *    post:
 *      summary: Subscribe to newsletter
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
 *          description: Successfully signed to newsletter.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "400":
 *          description: User already subscribes to newsletter.
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
