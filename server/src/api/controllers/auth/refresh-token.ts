import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Token } from "../../../models/index.js";
import { validateRefreshToken } from "../../validators/user.validator.js";
import {
  errorHelper,
  getText,
  ipHelper,
  signAccessToken,
  signRefreshToken,
} from "../../../utils/index.js";
import { refreshTokenSecretKey } from "../../../config/index.js";
const { verify } = jwt;

const refreshToken: RequestHandler = async (req, res) => {
  try {
    const { error } = validateRefreshToken(req.body);
    if (error) {
      res.status(400).json(errorHelper("00059", req, error.details[0].message));
      return;
    }

    try {
      req.user = verify(req.body.refreshToken, refreshTokenSecretKey) as {
        _id: string;
      };
    } catch (err) {
      res.status(400).json(errorHelper("00063", req, (err as Error).message));
      return;
    }

    const userId = new Types.ObjectId(req.user._id);

    const userToken = await Token.findOne({ userId });
    if (!userToken || userToken.refreshToken !== req.body.refreshToken) {
      res.status(404).json(errorHelper("00061", req));
      return;
    }

    if (userToken.expiresIn.getTime() <= Date.now() || !userToken.status) {
      res.status(400).json(errorHelper("00062", req));
      return;
    }

    const newAccessToken = signAccessToken(userId);
    const newRefreshToken = signRefreshToken(userId);

    await Token.updateOne(
      { userId },
      {
        $set: {
          refreshToken: newRefreshToken,
          createdByIp: ipHelper(req),
          createdAt: Date.now(),
          expiresIn: Date.now() + 604800000,
          status: true,
        },
      },
    );

    res.status(200).json({
      resultMessage: { en: getText("en", "00065"), tr: getText("tr", "00065") },
      resultCode: "00065",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default refreshToken;

/**
 * @swagger
 * /auth/refresh-token:
 *    post:
 *      summary: Refreshes the Access Token
 *      requestBody:
 *        description: Valid Refresh Token
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                refreshToken:
 *                  type: string
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: The token is refreshed successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *        "400":
 *          description: Please provide refresh token.
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
