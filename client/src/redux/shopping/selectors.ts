// const selectShoppingList = state => state.shoppingList.items;
const selectShoppingList = (state) => {
  let sortedList;
  if (state.shoppingList.items.lenghth < 1) return;
  sortedList = state.shoppingList.items.toSorted((a, b) => {
    const nameA = a.recipeName.toUpperCase();
    const nameB = b.recipeName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sortedList;
};
const selectShoppingListError = (state) => state.shoppingList.error;
const selectShoppingListIsLoading = (state) => state.shoppingList.isLoading;

export {
  selectShoppingList,
  selectShoppingListError,
  selectShoppingListIsLoading,
};
