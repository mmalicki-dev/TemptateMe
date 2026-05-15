import { Recipe, Category, Ingredient } from "../../../models/index.js";
import { Types } from "mongoose";

const paginatedQuery = async (matchStage, sortStage, skip, limit) => {
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

const getRecipeByIdFromDb = async (recipeId) => {
  return await Recipe.findById(recipeId);
};

const getRecipesFromDbQuery = async ({ page = 0, limit = 8, query = "" }) => {
  return paginatedQuery(
    { title: { $regex: `.*${query}.*`, $options: "i" } },
    null,
    page * limit,
    limit
  );
};

const getFavoritesRecipes = async ({ userId, page = 0, limit = 4 }) => {
  return paginatedQuery(
    { favorites: new Types.ObjectId(userId) },
    null,
    page * limit,
    limit
  );
};

const getPopularRecipesFromDb = async ({ page = 0, limit = 8 }) => {
  return paginatedQuery({}, { favorites: -1 }, page * limit, limit);
};

const addToFavoritesInDb = async ({ userId, recipeId }) => {
  const recipe = await Recipe.findById(recipeId);
  recipe.favorites.push(new Types.ObjectId(userId));
  await recipe.save();
};

const deleteFromFavoritesInDb = async ({ userId, recipeId }) => {
  const recipe = await Recipe.findById(recipeId);
  recipe.favorites.pull(new Types.ObjectId(userId));
  await recipe.save();
};

const getRecipesFromDbCategory = async ({
  page = 0,
  limit = 8,
  category = "",
}) => {
  return paginatedQuery(
    { category: { $regex: `.*${category}.*`, $options: "i" } },
    null,
    page * limit,
    limit
  );
};

const getCategoriesFromDb = async () => {
  return await Category.find({}).sort({ title: 1 });
};

const getAllIngredientsFromDb = async () => {
  return await Ingredient.find({});
};

const getIngredientByIdFromDb = async (id) => {
  return await Ingredient.findById(id);
};

const getRecipesFromDbIngredient = async ({
  page = 0,
  limit = 8,
  ingredientId = "",
}) => {
  return paginatedQuery(
    { "ingredients.id": new Types.ObjectId(ingredientId) },
    null,
    page * limit,
    limit
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
