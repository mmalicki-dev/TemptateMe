import type { RequestHandler } from "express";
import { User } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

const stopNewsletter: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    if (!user.newsletter) {
      res.status(400).json({
        resultMessage: { en: getText("en", "00112") },
        resultCode: "00112",
      });
      return;
    }

    user.newsletter = false;
    await user.save();

    res.status(200).json({
      resultMessage: { en: getText("en", "00111") },
      resultCode: "00111",
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default stopNewsletter;

/**
 * @swagger
 * /user/subscribe:
 *    delete:
 *      summary: Unsubscribe from newsletter
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
 *          description: Successfully unsubscribed from newsletter.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "400":
 *          description: User already isn't subscribing.
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
