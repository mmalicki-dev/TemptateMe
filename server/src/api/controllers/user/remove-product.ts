import type { RequestHandler } from "express";
import { ok, fail } from "../../../utils/index.js";
import { getOnlyShopping } from "./helpers.js";

const removeProduct: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyShopping(req.user!._id);
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    const productId = req.body.id as string;
    const index = user.shoppingList.findIndex((item) => item._id.toHexString() === productId);

    if (index === -1) {
      fail(res, "Product not found in shopping list.", 404);
      return;
    }

    user.shoppingList.splice(index, 1);
    await user.save();

    ok(res, { idProduct: productId });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default removeProduct;
