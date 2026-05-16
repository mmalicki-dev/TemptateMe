import { Router } from "express";
import {
  addProduct,
  addRecipe,
  addRecipeImage,
  getShoppingList,
  getUsersRecipes,
  removeProduct,
  removeRecipe,
  newsletter,
  stopNewsletter,
  updateUsersAvatar,
  updateUsersInfo,
} from "../controllers/user/index.js";
import { auth, fileMiddleware } from "../middlewares/index.js";

const router = Router();

router.put(
  "/edit/avatar",
  auth,
  fileMiddleware.single("avatar"),
  updateUsersAvatar
);
router.put("/edit/info", auth, updateUsersInfo);

// FUNCTIONALITY
router.post("/subscribe", auth, newsletter);
router.delete("/subscribe", auth, stopNewsletter);
router.get("/shopping", auth, getShoppingList);
router.post("/shopping", auth, addProduct);
router.patch("/shopping", auth, removeProduct);
router.get("/ownRecipes", auth, getUsersRecipes);
router.post("/ownRecipes", auth, addRecipe);
router.post(
  "/ownRecipes/image",
  auth,
  fileMiddleware.single("recipeImage"),
  addRecipeImage
);
router.delete("/ownRecipes/:recipeId", auth, removeRecipe);

export default router;
