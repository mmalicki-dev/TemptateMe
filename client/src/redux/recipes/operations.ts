import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../apiClient.ts";

interface FetchByPagePayload {
  page: number;
}

interface FetchByQueryPayload {
  query: string;
  page: number;
}

interface FetchByCategoryPayload {
  page: number;
  category: string;
}

interface AddRecipePayload {
  recipeImage: File;
  recipeInfo: unknown;
}

const fetchRecipes = createAsyncThunk(
  "recipe/fetchMainPage",
  async (_, thunkAPI) => {
    try {
      return await api.get("recipes/main-page");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const fetchPopularRecipes = createAsyncThunk(
  "recipe/fetchPopularRecipes",
  async ({ page }: FetchByPagePayload, thunkAPI) => {
    try {
      return await api.get(`recipes/popular-recipe?page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const fetchRecipesByQuery = createAsyncThunk(
  "recipe/fetchByQuery",
  async ({ query, page }: FetchByQueryPayload, thunkAPI) => {
    try {
      return await api.get(`recipes/search/?query=${query}&page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const fetchFavorites = createAsyncThunk(
  "recipe/fetchFavorites",
  async (page: number, thunkAPI) => {
    try {
      return await api.get(`recipes/favorites?page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const fetchRecipeById = createAsyncThunk(
  "recipe/fetchById",
  async (id: string, thunkAPI) => {
    try {
      return await api.get(`recipes/${id}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const fetchRecipesByCategory = createAsyncThunk(
  "recipe/fetchByCategory",
  async ({ page, category }: FetchByCategoryPayload, thunkAPI) => {
    try {
      return await api.get(`recipes/category/${category}?page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const fetchRecipesByIngredient = createAsyncThunk(
  "recipe/fetchByIngredient",
  async (ingredientId: string, thunkAPI) => {
    try {
      return await api.get(`recipes/ingredients/${ingredientId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const addRecipe = createAsyncThunk(
  "recipe/addRecipe",
  async ({ recipeImage, recipeInfo }: AddRecipePayload, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("recipeImage", recipeImage);
      const recipe = await api.post<{ recipe: { _id: string } }>(
        "user/ownRecipes",
        recipeInfo,
      );
      return await api.post("user/ownRecipes/image", formData, {
        headers: { recipeId: recipe.recipe._id },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (recipeId: string, thunkAPI) => {
    try {
      return await api.delete(`user/ownRecipes/${recipeId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const addToFavorites = createAsyncThunk(
  "recipe/addToFavorites",
  async (recipeId: string, thunkAPI) => {
    try {
      return await api.post(`recipes/favorites/${recipeId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const deleteFromFavorites = createAsyncThunk(
  "recipe/deleteFromFavorites",
  async (recipeId: string, thunkAPI) => {
    try {
      return await api.delete(`recipes/favorites/${recipeId}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const updatePage = createAsyncThunk(
  "recipe/updatePage",
  async (page: number, thunkAPI) => {
    if (page < 0) {
      return thunkAPI.rejectWithValue(new Error("Page can't be below 0"));
    }
    return page;
  },
);

const fetchUserRecipes = createAsyncThunk(
  "recipe/fetchUserRecipes",
  async (page: number, thunkAPI) => {
    try {
      return await api.get(`user/ownRecipes?page=${page}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
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
