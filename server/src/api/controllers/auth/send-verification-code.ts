import type { RequestHandler } from 'express';
import { User } from '../../../models/index.js';
import { validateSendVerificationCode } from '../../validators/user.validator.js';
import {
  generateRandomCode,
  sendCodeToEmail,
  errorHelper,
  logger,
  getText,
  signConfirmCodeToken,
} from '../../../utils/index.js';

const sendVerificationCode: RequestHandler = async (req, res) => {
  try {
    const { error } = validateSendVerificationCode(req.body);
    if (error) {
      res.status(400).json(errorHelper('00029', req, error.details[0].message));
      return;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json(errorHelper('00036', req));
      return;
    }

    const emailCode = generateRandomCode(4);
    const confirmCodeToken = signConfirmCodeToken(user._id, emailCode);

    user.confirmCode = confirmCodeToken;
    user.isVerified = false;
    await user.save();

    await sendCodeToEmail(req.body.email, user.name, confirmCodeToken);

    logger('00048', user._id.toHexString(), getText('en', '00048'), 'Info', req);
    res.status(200).json({
      resultMessage: { en: getText('en', '00048'), tr: getText('tr', '00048') },
      resultCode: '00048',
      confirmToken: confirmCodeToken,
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default sendVerificationCode;

/**
 * @swagger
 * /auth/send-verification-code:
 *    post:
 *      summary: Sends a verification code to the user.
 *      requestBody:
 *        description: Email of the user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: The code is sent to your email successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          confirmToken:
 *                              type: string
 *        "400":
 *          description: Please provide a valid email!
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
