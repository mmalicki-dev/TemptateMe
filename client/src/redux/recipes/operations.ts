import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../apiClient.js";

const fetchRecipes = createAsyncThunk(
  "recipe/fetchMainPage",
  async (_, thunkAPI) => {
    try {
      return await api.get("recipes/main-page");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchPopularRecipes = createAsyncThunk(
  "recipe/fetchPopularRecipes",
  async (data, thunkAPI) => {
    try {
      const { page } = data;
      return await api.get(`recipes/popular-recipe?page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchRecipesByQuery = createAsyncThunk(
  "recipe/fetchByQuery",
  async (data, thunkAPI) => {
    try {
      const { query, page } = data;
      return await api.get(`recipes/search/?query=${query}&page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchFavorites = createAsyncThunk(
  "recipe/fetchFavorites",
  async (page, thunkAPI) => {
    try {
      return await api.get(`recipes/favorites?page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchRecipeById = createAsyncThunk(
  "recipe/fetchById",
  async (id, thunkAPI) => {
    try {
      return await api.get(`recipes/${id}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchRecipesByCategory = createAsyncThunk(
  "recipe/fetchByCategory",
  async (data, thunkAPI) => {
    try {
      const { page, category } = data;
      return await api.get(`recipes/category/${category}?page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchRecipesByIngredient = createAsyncThunk(
  "recipe/fetchByIngredient",
  async (ingredientId, thunkAPI) => {
    try {
      return await api.get(`recipes/ingredients/${ingredientId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addRecipe = createAsyncThunk(
  "recipe/addRecipe",
  async ({ recipeImage, recipeInfo }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("recipeImage", recipeImage);
      const recipe = await api.post("user/ownRecipes", recipeInfo);
      return await api.post("user/ownRecipes/image", formData, {
        headers: { recipeId: recipe.recipes._id },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (recipeId, thunkAPI) => {
    try {
      return await api.delete(`user/ownRecipes/${recipeId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addToFavorites = createAsyncThunk(
  "recipe/addToFavorites",
  async (recipeId, thunkAPI) => {
    try {
      return await api.post(`recipes/favorites/${recipeId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteFromFavorites = createAsyncThunk(
  "recipe/deleteFromFavorites",
  async (recipeId, thunkAPI) => {
    try {
      return await api.delete(`recipes/favorites/${recipeId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updatePage = createAsyncThunk(
  "recipe/updatePage",
  async (page, thunkAPI) => {
    if (page < 0) {
      return thunkAPI.rejectWithValue(new Error("Page can't be below 0"));
    }
    return page;
  }
);

const fetchUserRecipes = createAsyncThunk(
  "recipe/fetchUserRecipes",
  async (page, thunkAPI) => {
    try {
      return await api.get(`user/ownRecipes?page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  fetchRecipes,
  addRecipe,
  deleteRecipe,
  fetchRecipesByCategory,
  fetchRecipesByQuery,
  fetchRecipeById,
  fetchFavorites,
  fetchRecipesByIngredient,
  addToFavorites,
  deleteFromFavorites,
  updatePage,
  fetchPopularRecipes,
  fetchUserRecipes,
};
