import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { IngredientsState, Ingredient } from "../../types/index.ts";
import { fetchIngredients } from "./operations.ts";

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        const payload = action.payload as { ingredients: Ingredient[] };
        state.items = payload.ingredients;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as PayloadAction<unknown>) ?? null;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
