import type { RequestHandler } from "express";
import { ok, fail } from "../../../utils/index.js";
import { getOnlyShopping } from "./helpers.js";

const getShoppingList: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyShopping(req.user!._id);
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    ok(res, { shoppingList: user.shoppingList });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default getShoppingList;
