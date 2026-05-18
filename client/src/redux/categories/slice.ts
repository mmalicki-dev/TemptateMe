import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { CategoriesState, Category } from "../../types/index.ts";
import { fetchAllCategories } from "./operations.ts";

const initialState: CategoriesState = {
  items: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        const payload = action.payload as { categories: Category[] };
        state.items = payload.categories;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as PayloadAction<unknown>) ?? null;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
