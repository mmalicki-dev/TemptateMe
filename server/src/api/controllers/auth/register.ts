import type { RequestHandler } from "express";
import { hash } from "bcryptjs";
import { User } from "../../../models/index.js";
import { validateRegister } from "../../validators/user.validator.js";
import {
  errorHelper,
  generateRandomCode,
  sendCodeToEmail,
  logger,
  getText,
  turkishToEnglish,
  signConfirmCodeToken,
} from "../../../utils/index.js";

const register: RequestHandler = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      let code = "00025";
      if (error.details[0].message.includes("email")) code = "00026";
      else if (error.details[0].message.includes("password")) code = "00027";
      else if (error.details[0].message.includes("name")) code = "00028";
      res.status(400).json(errorHelper(code, req, error.details[0].message));
      return;
    }

    const exists = await User.exists({ email: req.body.email });
    if (exists) {
      res.status(409).json(errorHelper("00032", req));
      return;
    }

    const hashed = await hash(req.body.password, 10);
    const emailCode = generateRandomCode(4);
    const name = turkishToEnglish(req.body.name);

    let username = "";
    let existsUsername = true;
    const tempName = name.includes(" ")
      ? name.trim().split(" ")[0].toLowerCase()
      : name.toLowerCase().trim();

    do {
      username = tempName + generateRandomCode(4);
      existsUsername = !!(await User.exists({ username }));
    } while (existsUsername);

    const user = new User({
      email: req.body.email,
      password: hashed,
      name,
      username,
      isVerified: false,
    });

    const confirmCodeToken = signConfirmCodeToken(user._id, emailCode);
    user.confirmCode = confirmCodeToken;
    await user.save();

    await sendCodeToEmail(req.body.email, user.name, confirmCodeToken);

    const { password: _pw, ...userResponse } = user.toObject();

    logger("00035", user._id.toHexString(), getText("en", "00035"), "Info", req);
    res.status(200).json({
      resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
      resultCode: "00035",
      user: userResponse,
      confirmToken: confirmCodeToken,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  }
};

export default register;

/**
 * @swagger
 * /auth/register:
 *    post:
 *      summary: Registers the user
 *      requestBody:
 *        description: Email, password and name are required information about the user
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
 *                name:
 *                  type: string
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: You registered successfully.
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
 *                          confirmToken:
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
