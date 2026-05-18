import { Recipe, Category, Ingredient } from "../../../models/index.js";
import { Types } from "mongoose";

const escapeRegex = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

const paginatedQuery = async (
  matchStage: Record<string, unknown>,
  sortStage: Record<string, 1 | -1> | null,
  skip: number,
  limit: number,
) => {
  const pipeline = [
    { $match: matchStage },
    ...(sortStage ? [{ $sort: sortStage }] : []),
    {
      $facet: {
        docs: [{ $skip: skip }, { $limit: limit }],
        count: [{ $count: "total" }],
      },
    },
  ];
  const [result] = await Recipe.aggregate(pipeline);
  const total = result.count[0]?.total ?? 0;
  return { recipes: result.docs, pageAmount: Math.ceil(total / limit) };
};

const getRecipeByIdFromDb = async (recipeId: string) => {
  return Recipe.findById(recipeId);
};

const getRecipesFromDbQuery = async ({ page = 0, limit = 8, query = "" }: { page?: number; limit?: number; query?: string }) => {
  return paginatedQuery(
    { title: { $regex: `.*${escapeRegex(query)}.*`, $options: "i" } },
    null,
    page * limit,
    limit,
  );
};

const getFavoritesRecipes = async ({ userId, page = 0, limit = 4 }: { userId: string; page?: number; limit?: number }) => {
  return paginatedQuery(
    { favorites: new Types.ObjectId(userId) },
    null,
    page * limit,
    limit,
  );
};

const getPopularRecipesFromDb = async ({ page = 0, limit = 8 }: { page?: number; limit?: number }) => {
  return paginatedQuery({}, { favorites: -1 }, page * limit, limit);
};

const addToFavoritesInDb = async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
  await Recipe.updateOne({ _id: recipeId }, { $addToSet: { favorites: new Types.ObjectId(userId) } });
};

const deleteFromFavoritesInDb = async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
  await Recipe.updateOne({ _id: recipeId }, { $pull: { favorites: new Types.ObjectId(userId) } });
};

const getRecipesFromDbCategory = async ({ page = 0, limit = 8, category = "" }: { page?: number; limit?: number; category?: string }) => {
  return paginatedQuery(
    { category: { $regex: `.*${escapeRegex(category)}.*`, $options: "i" } },
    null,
    page * limit,
    limit,
  );
};

const getCategoriesFromDb = async () => {
  return Category.find({}).sort({ title: 1 });
};

const getAllIngredientsFromDb = async () => {
  return Ingredient.find({});
};

const getIngredientByIdFromDb = async (id: string) => {
  return Ingredient.findById(id);
};

const getRecipesFromDbIngredient = async ({ page = 0, limit = 8, ingredientId = "" }: { page?: number; limit?: number; ingredientId?: string }) => {
  return paginatedQuery(
    { "ingredients.id": ingredientId },
    null,
    page * limit,
    limit,
  );
};

export {
  getRecipeByIdFromDb,
  getRecipesFromDbQuery,
  getFavoritesRecipes,
  getPopularRecipesFromDb,
  addToFavoritesInDb,
  deleteFromFavoritesInDb,
  getRecipesFromDbCategory,
  getCategoriesFromDb,
  getAllIngredientsFromDb,
  getIngredientByIdFromDb,
  getRecipesFromDbIngredient,
};
