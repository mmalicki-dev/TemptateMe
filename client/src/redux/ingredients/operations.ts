import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../apiClient.ts";

const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await api.get("recipes/ingredients/list");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const fetchIngredientById = createAsyncThunk(
  "ingredients/fetchByIngredient",
  async (id: string, thunkAPI) => {
    try {
      return await api.get(`recipes/ingredients/${id}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export { fetchIngredients, fetchIngredientById };
