import type { RootState } from "../store.ts";
import type { Recipe } from "../../types/index.ts";

const selectRecipes = (state: RootState): Recipe[] => state.recipes.items;
const selectRecipesError = (state: RootState): unknown => state.recipes.error;
const selectRecipesIsLoading = (state: RootState): boolean =>
  state.recipes.isLoading;
const selectRecipesPageAmount = (state: RootState): number =>
  state.recipes.pageAmount;
const selectRecipesPage = (state: RootState): number => state.recipes.page;

export {
  selectRecipes,
  selectRecipesError,
  selectRecipesIsLoading,
  selectRecipesPageAmount,
  selectRecipesPage,
};
