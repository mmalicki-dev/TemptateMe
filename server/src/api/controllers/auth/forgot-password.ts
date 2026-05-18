import type { RequestHandler } from "express";
import { hash } from "bcryptjs";
import { User } from "../../../models/index.js";
import { validateForgotPassword } from "../../validators/user.validator.js";
import { errorHelper, getText, logger } from "../../../utils/index.js";

const forgotPassword: RequestHandler = async (req, res) => {
  try {
    const { error } = validateForgotPassword(req.body);
    if (error) {
      res.status(400).json(errorHelper("00066", req, error.details[0].message));
      return;
    }

    const hashed = await hash(req.body.password, 10);

    await User.updateOne(
      { _id: req.user!._id, isVerified: true },
      { $set: { password: hashed } },
    );

    logger("00068", req.user!._id, getText("en", "00068"), "Info", req);
    res.status(200).json({
      resultMessage: { en: getText("en", "00068"), tr: getText("tr", "00068") },
      resultCode: "00068",
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default forgotPassword;

/**
 * @swagger
 * /auth/forgot-password:
 *    post:
 *      summary: Saves the Password when Forgot
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        description: New password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: The new password was created successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "400":
 *          description: Please provide a password longer than 6, less than 20 characters.
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
