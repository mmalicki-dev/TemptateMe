import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../apiClient.ts";

const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await api.get("recipes/category-list");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export { fetchAllCategories };
