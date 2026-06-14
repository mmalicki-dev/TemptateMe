import { createSlice } from "@reduxjs/toolkit";
import type { UnknownAction, PayloadAction } from "@reduxjs/toolkit";

import type { RecipesState, Recipe } from "../../types/index.ts";
import {
  addRecipe,
  addToFavorites,
  deleteRecipe,
  deleteFromFavorites,
  fetchRecipeById,
  updatePage,
} from "./operations.ts";

const isPendingAction = (action: UnknownAction): boolean =>
  action.type.startsWith("recipe/") && action.type.endsWith("/pending");

const isFulfilledAction = (
  action: UnknownAction,
): action is PayloadAction<unknown> =>
  action.type.startsWith("recipe/") && action.type.endsWith("/fulfilled");

const isRejectAction = (
  action: UnknownAction,
): action is PayloadAction<unknown> =>
  action.type.startsWith("recipe/") && action.type.endsWith("/rejected");

const clearLoadingError = (state: RecipesState): void => {
  state.isLoading = false;
  state.error = null;
};

const handlePending = (state: RecipesState): void => {
  state.isLoading = true;
};

const handleFulfilled = (
  state: RecipesState,
  action: PayloadAction<unknown>,
): void => {
  clearLoadingError(state);
  if (!action.payload) return;
  const payload = action.payload as { recipes?: Recipe[]; pageAmount?: number };
  if (payload.recipes) state.items = payload.recipes;
  if (payload.pageAmount !== undefined) state.pageAmount = payload.pageAmount;
};

const handleRejected = (
  state: RecipesState,
  action: PayloadAction<unknown>,
): void => {
  state.isLoading = false;
  state.error = action.payload ?? null;
  state.page = 0;
};

const initialState: RecipesState = {
  items: [],
  currentRecipe: null,
  pageAmount: 0,
  page: 0,
  isLoading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items = [];
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        clearLoadingError(state);
        const payload = action.payload as unknown as { recipe: Recipe };
        state.currentRecipe = payload.recipe;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        clearLoadingError(state);
        const payload = action.payload as unknown as { recipe: Recipe };
        state.items.push(payload.recipe);
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        state.page = action.payload;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        clearLoadingError(state);
        const { recipeId } = action.payload as unknown as { recipeId: string };
        const index = state.items.findIndex((r) => r._id === recipeId);
        if (index !== -1) state.items.splice(index, 1);
      })
      .addCase(addToFavorites.fulfilled, (state) => {
        clearLoadingError(state);
      })
      .addCase(deleteFromFavorites.fulfilled, (state, action) => {
        clearLoadingError(state);
        const { recipeId } = action.payload as unknown as { recipeId: string };
        const index = state.items.findIndex((r) => r._id === recipeId);
        if (index !== -1) state.items.splice(index, 1);
      })
      .addMatcher(isFulfilledAction, handleFulfilled)
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectAction, handleRejected);
  },
});

export const { clearItems } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
