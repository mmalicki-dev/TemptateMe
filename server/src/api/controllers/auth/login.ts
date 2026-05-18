import type { RequestHandler } from "express";
import { compare } from "bcryptjs";
import { User, Token } from "../../../models/index.js";
import { validateLogin } from "../../validators/user.validator.js";
import { errorHelper, getText, logger, signAccessToken, signRefreshToken } from "../../../utils/index.js";

const login: RequestHandler = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      let code = "00038";
      if (error.details[0].message.includes("email")) code = "00039";
      else if (error.details[0].message.includes("password")) code = "00040";
      res.status(400).json(errorHelper(code, req, error.details[0].message));
      return;
    }

    const user = await User.findOne({ email: req.body.email, isVerified: true }).select("+password");
    if (!user) {
      res.status(404).json(errorHelper("00042", req));
      return;
    }

    const match = await compare(req.body.password, user.password);
    if (!match) {
      res.status(400).json(errorHelper("00045", req));
      return;
    }

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    await Token.updateOne(
      { userId: user._id },
      { $set: { refreshToken, status: true, expiresIn: Date.now() + 604800000, createdAt: Date.now() } },
    );

    logger("00047", user._id.toHexString(), getText("en", "00047"), "Info", req);
    res.status(200).json({
      resultMessage: { en: getText("en", "00047"), tr: getText("tr", "00047") },
      resultCode: "00047",
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default login;

/**
 * @swagger
 * /auth/login:
 *    post:
 *      summary: Login
 *      requestBody:
 *        description: Email and password information to login
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: You logged in successfully.
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
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *        "400":
 *          description: Please provide all the required fields!
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
