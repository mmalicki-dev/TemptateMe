import type { RootState } from "../store.ts";
import type { ShoppingItem } from "../../types/index.ts";

const selectShoppingList = (state: RootState): ShoppingItem[] => {
  const items = state.shoppingList.items;
  if (items.length < 1) return items;
  return items.toSorted((a, b) => {
    const nameA = a.recipeName.toUpperCase();
    const nameB = b.recipeName.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

const selectShoppingListError = (state: RootState): unknown =>
  state.shoppingList.error;
const selectShoppingListIsLoading = (state: RootState): boolean =>
  state.shoppingList.isLoading;

export {
  selectShoppingList,
  selectShoppingListError,
  selectShoppingListIsLoading,
};
