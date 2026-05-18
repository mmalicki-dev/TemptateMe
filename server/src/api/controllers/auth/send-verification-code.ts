import type { RequestHandler } from 'express';
import { User } from '../../../models/index.js';
import { validateSendVerificationCode } from '../../validators/user.validator.js';
import {
  ok,
  fail,
  generateRandomCode,
  sendCodeToEmail,
  signConfirmCodeToken,
} from '../../../utils/index.js';

const sendVerificationCode: RequestHandler = async (req, res) => {
  try {
    const { error } = validateSendVerificationCode(req.body);
    if (error) {
      fail(res, error.details[0].message, 400);
      return;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      fail(res, "No account with this email was found.", 404);
      return;
    }

    const emailCode = generateRandomCode(4);
    const confirmCodeToken = signConfirmCodeToken(user._id, emailCode);

    user.confirmCode = confirmCodeToken;
    user.isVerified = false;
    await user.save();

    await sendCodeToEmail(req.body.email, user.name, confirmCodeToken);

    ok(res, { confirmToken: confirmCodeToken });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default sendVerificationCode;
