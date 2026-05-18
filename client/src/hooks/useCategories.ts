import { useSelector } from "react-redux";

import type { RootState } from "../redux/store.ts";
import type { Category } from "../types/index.ts";
import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from "../redux/categories/selectors.ts";

const useCategories = () => {
  const isLoading = useSelector<RootState, boolean>(selectCategoriesLoading);
  const categories = useSelector<RootState, Category[]>(selectCategories);
  const error = useSelector<RootState, unknown>(selectCategoriesError);
  const categoriesTitles = categories.map((item) => item.title);

  return { isLoading, categories, categoriesTitles, error };
};

export default useCategories;
