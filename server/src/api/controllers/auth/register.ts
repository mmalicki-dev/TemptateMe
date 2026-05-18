import type { RequestHandler } from "express";
import { hash } from "bcryptjs";
import { User } from "../../../models/index.js";
import { validateRegister } from "../../validators/user.validator.js";
import {
  ok,
  fail,
  generateRandomCode,
  sendCodeToEmail,
  turkishToEnglish,
  signConfirmCodeToken,
} from "../../../utils/index.js";

const register: RequestHandler = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      fail(res, error.details[0].message, 400);
      return;
    }

    const exists = await User.exists({ email: req.body.email });
    if (exists) {
      fail(res, "An account with this email already exists.", 409);
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

    ok(res, { user: userResponse, confirmToken: confirmCodeToken });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default register;
