import type { RequestHandler } from "express";
import { User } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";
import { getUserById } from "./helpers.js";

const updateUserInfo: RequestHandler = async (req, res) => {
  try {
    const user = await getUserById(req.user!._id);
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

    res.status(200).json({
      resultMessage: { en: getText("en", "00113") },
      resultCode: "00113",
      user,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default updateUserInfo;

/**
 * @swagger
 * /user/info:
 *    put:
 *      summary: Update user info
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
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *        "400":
 *          description: Please provide valid values.
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
