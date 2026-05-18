import { useSelector } from "react-redux";

import type { RootState } from "../redux/store.ts";
import type { ShoppingItem } from "../types/index.ts";
import {
  selectShoppingList,
  selectShoppingListIsLoading,
  selectShoppingListError,
} from "../redux/shopping/selectors.ts";

const useShopping = () => {
  const isLoading = useSelector<RootState, boolean>(selectShoppingListIsLoading);
  const shoppingList = useSelector<RootState, ShoppingItem[]>(selectShoppingList);
  const error = useSelector<RootState, unknown>(selectShoppingListError);

  return { isLoading, shoppingList, error };
};

export default useShopping;
