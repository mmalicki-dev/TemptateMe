import type { RootState } from "../store.ts";
import type { Ingredient } from "../../types/index.ts";

const selectIngredients = (state: RootState): Ingredient[] =>
  state.ingredients.items;
const selectIngredientsError = (state: RootState): unknown =>
  state.ingredients.error;
const selectIngredientsLoading = (state: RootState): boolean =>
  state.ingredients.isLoading;

export { selectIngredients, selectIngredientsError, selectIngredientsLoading };
