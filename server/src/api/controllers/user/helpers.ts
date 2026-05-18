import { User, Recipe } from "../../../models/index.js";
import type { IRecipe } from "../../../models/index.js";

const createRecipeToDb = async ({ recipe }: { recipe: Partial<IRecipe> }) => {
  return new Recipe({ ...recipe });
};

const deleteRecipeInDb = async (id: string) => {
  return Recipe.findByIdAndDelete(id);
};

const getUserById = async (id: string) => {
  return User.findById(id);
};

const getOnlyRecipes = async (id: string) => {
  return User.findById(id).select("createdRecipes");
};

const getOnlyShopping = async (id: string) => {
  return User.findById(id).select("shoppingList");
};

export { getUserById, createRecipeToDb, deleteRecipeInDb, getOnlyRecipes, getOnlyShopping };
