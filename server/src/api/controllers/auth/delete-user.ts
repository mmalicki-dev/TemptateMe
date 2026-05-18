import type { RequestHandler } from "express";
import { User, Token, Recipe } from "../../../models/index.js";
import { ok, fail } from "../../../utils/index.js";

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user!._id;

    const user = await User.findById(userId).select("createdRecipes");
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    await Recipe.deleteMany({ _id: { $in: user.createdRecipes } });
    await Recipe.updateMany({ favorites: userId }, { $pull: { favorites: userId } });
    await Token.deleteOne({ userId });
    await User.deleteOne({ _id: userId });

    ok(res);
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default deleteUser;
