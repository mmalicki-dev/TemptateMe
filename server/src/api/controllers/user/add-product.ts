import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { ok, fail } from "../../../utils/index.js";
import { getOnlyShopping } from "./helpers.js";

const addProduct: RequestHandler = async (req, res) => {
  try {
    const user = await getOnlyShopping(req.user!._id);
    if (!user) {
      fail(res, "User not found.", 404);
      return;
    }

    const product = req.body;
    const newProduct = {
      _id: new Types.ObjectId(),
      ingredientId: product.id as string,
      measure: product.measure as string,
      recipeId: product.recipeId as string,
      recipeName: product.recipeName as string,
    };

    user.shoppingList.push(newProduct);
    await user.save();

    ok(res, { newProduct });
  } catch (err) {
    console.error((err as Error).message);
    fail(res, "An internal server error occurred, please try again.", 500);
  }
};

export default addProduct;
