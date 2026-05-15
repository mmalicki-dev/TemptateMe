import { User, Token } from "../../../models/index.js";
import {
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
} from "../../../utils/index.js";
import ipHelper from "../../../utils/helpers/ip-helper.js";
import { clientUrl, jwtSecretKey } from "../../../config/index.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
const redirectUrl = clientUrl;

const verifyEmail = async (req, res) => {
  const { confirmCodeToken } = req.params;
  let title = "Welcome!";
  let info = "Your email has been confirmed";

  try {
    req.user = verify(confirmCodeToken, jwtSecretKey);
  } catch (err) {
    title = "Error";
    info = err.message;
    return res.render("email", { redirectUrl, title, info });
  }

  const exists = await User.exists({
    _id: req.user._id,
    isActivated: true,
  }).catch((err) => {
    title = "Error";
    info = err.message;
    return res.render("email", { redirectUrl, title, info });
  });

  if (!exists) {
    title = "Error";
    info = "User not found or account not activated.";
    return res.render("email", { redirectUrl, title, info });
  }

  await User.updateOne(
    { _id: req.user._id },
    { $set: { isVerified: true } },
  ).catch((err) => {
    title = "Error";
    info = err.message;
    return res.render("email", { redirectUrl, title, info });
  });

  const accessToken = signAccessToken(req.user._id);
  const refreshToken = signRefreshToken(req.user._id);
  try {
    const token = new Token({
      userId: req.user._id,
      refreshToken: refreshToken,
      status: true,
      expiresIn: Date.now() + 604800000,
      createdAt: Date.now(),
      createdByIp: ipHelper(req),
    });
    await token.save();
  } catch (err) {
    title = "Error";
    info = err.message;
    return res.render("email", { redirectUrl, title, info });
  }

  logger("00058", req.user._id, getText("en", "00058"), "Info", req);

  return res.render("email", { redirectUrl, title, info });
};

export default verifyEmail;

/**
 * @swagger
 * /auth/verify-email:
 *    post:
 *      summary: Verifies the email address of the user.
 *      requestBody:
 *        description: Confirm code and confirm token.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                code:
 *                  type: string
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: Your email address was verified successfully.
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
 *          description: Please send a verification code.
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
