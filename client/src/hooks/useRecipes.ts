import { useSelector } from "react-redux";

import type { RootState } from "../redux/store.ts";
import type { Recipe } from "../types/index.ts";
import {
  selectRecipes,
  selectCurrentRecipe,
  selectRecipesIsLoading,
  selectRecipesPageAmount,
  selectRecipesError,
  selectRecipesPage,
} from "../redux/recipes/selectors.ts";

const useRecipes = () => {
  const isLoading = useSelector<RootState, boolean>(selectRecipesIsLoading);
  const pageAmount = useSelector<RootState, number>(selectRecipesPageAmount);
  const page = useSelector<RootState, number>(selectRecipesPage);
  const recipes = useSelector<RootState, Recipe[]>(selectRecipes);
  const currentRecipe = useSelector<RootState, Recipe | null>(selectCurrentRecipe);
  const error = useSelector<RootState, unknown>(selectRecipesError);

  return { isLoading, recipes, currentRecipe, page, pageAmount, error };
};

export default useRecipes;
