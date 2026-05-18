import type { RequestHandler } from "express";
import { hash, compare } from "bcryptjs";
import { User } from "../../../models/index.js";
import { validateChangePassword } from "../../validators/user.validator.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

const changePassword: RequestHandler = async (req, res) => {
  try {
    const { error } = validateChangePassword(req.body);
    if (error) {
      res.status(400).json(errorHelper("00069", req, error.details[0].message));
      return;
    }

    if (req.body.oldPassword === req.body.newPassword) {
      res.status(400).json(errorHelper("00073", req));
      return;
    }

    const user = await User.findById(req.user!._id).select("password");
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    const match = await compare(req.body.oldPassword, user.password);
    if (!match) {
      res.status(400).json(errorHelper("00072", req));
      return;
    }

    user.password = await hash(req.body.newPassword, 10);
    await user.save();

    logger("00076", req.user!._id, getText("en", "00076"), "Info", req);
    res.status(200).json({
      resultMessage: { en: getText("en", "00076"), tr: getText("tr", "00076") },
      resultCode: "00076",
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default changePassword;

/**
 * @swagger
 * /auth/change-password:
 *    post:
 *      summary: Changes the Password
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        description: Old and new passwords
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                oldPassword:
 *                  type: string
 *                newPassword:
 *                  type: string
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: Your password was changed successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "400":
 *          description: Please provide old and new passwords that are longer than 6 letters and shorter than 20 letters.
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
