import type { RequestHandler } from "express";
import { User } from "../../../models/index.js";
import { validateEditUser } from "../../validators/user.validator.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

const editUser: RequestHandler = async (req, res) => {
  try {
    const { error } = validateEditUser(req.body);
    if (error) {
      let code = "00077";
      const message = error.details[0].message;
      if (message.includes("username")) code = "00081";
      res.status(400).json(errorHelper(code, req, message));
      return;
    }

    const user = await User.findById(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    if (req.body.name) user.name = req.body.name;

    if (req.body.username && req.body.username !== user.username) {
      const exist = await User.exists({ username: req.body.username });
      if (exist) {
        res.status(400).json(errorHelper("00084", req));
        return;
      }
      user.username = req.body.username;
    }

    await user.save();

    logger("00086", req.user!._id, getText("en", "00086"), "Info", req);
    res.status(200).json({
      resultMessage: { en: getText("en", "00086"), tr: getText("tr", "00086") },
      resultCode: "00086",
      photoUrl: user.photoUrl,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default editUser;

/**
 * @swagger
 * /user/edit:
 *    put:
 *      summary: Edit the Profile Information
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        description: User profile fields to update
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                username:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Your profile information was changed successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          photoUrl:
 *                              type: string
 *        "400":
 *          description: Please provide valid values for each key you want to change.
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
