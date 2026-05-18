import { useSelector } from "react-redux";

import type { RootState } from "../redux/store.ts";
import type { Ingredient } from "../types/index.ts";
import {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError,
} from "../redux/ingredients/selectors.ts";

const useIngredients = () => {
  const isLoading = useSelector<RootState, boolean>(selectIngredientsLoading);
  const ingredients = useSelector<RootState, Ingredient[]>(selectIngredients);
  const error = useSelector<RootState, unknown>(selectIngredientsError);

  return { isLoading, ingredients, error };
};

export default useIngredients;
