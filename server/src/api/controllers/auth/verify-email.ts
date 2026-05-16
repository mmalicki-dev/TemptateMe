import { User, Token } from "../../../models/index.js";
import { getText, logger, signAccessToken, signRefreshToken } from "../../../utils/index.js";
import ipHelper from "../../../utils/helpers/ip-helper.js";
import { clientUrl, jwtSecretKey } from "../../../config/index.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

const redirect = (res, error) => {
  if (error) {
    return res.redirect(`${clientUrl}/email-verified?error=${encodeURIComponent(error)}`);
  }
  return res.redirect(`${clientUrl}/email-verified?status=success`);
};

const verifyEmail = async (req, res) => {
  const { confirmCodeToken } = req.params;

  try {
    req.user = verify(confirmCodeToken, jwtSecretKey);
  } catch (err) {
    return redirect(res, err.message);
  }

  const exists = await User.exists({
    _id: req.user._id,
    isActivated: true,
  }).catch((err) => redirect(res, err.message));

  if (!exists) return redirect(res, "User not found or account not activated.");

  await User.updateOne(
    { _id: req.user._id },
    { $set: { isVerified: true } },
  ).catch((err) => redirect(res, err.message));

  const accessToken = signAccessToken(req.user._id);
  const refreshToken = signRefreshToken(req.user._id);

  try {
    const token = new Token({
      userId: req.user._id,
      refreshToken,
      status: true,
      expiresIn: Date.now() + 604800000,
      createdAt: Date.now(),
      createdByIp: ipHelper(req),
    });
    await token.save();
  } catch (err) {
    return redirect(res, err.message);
  }

  logger("00058", req.user._id, getText("en", "00058"), "Info", req);
  return redirect(res, null);
};

export default verifyEmail;
