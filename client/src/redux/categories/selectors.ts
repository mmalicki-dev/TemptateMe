import type { RootState } from "../store.ts";
import type { Category } from "../../types/index.ts";

const selectCategories = (state: RootState): Category[] =>
  state.categories.items;
const selectCategoriesError = (state: RootState): unknown =>
  state.categories.error;
const selectCategoriesLoading = (state: RootState): boolean =>
  state.categories.isLoading;

export { selectCategories, selectCategoriesError, selectCategoriesLoading };
