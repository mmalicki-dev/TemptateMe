const selectRecipes = (state) => state.recipes.items;
const selectRecipesError = (state) => state.recipes.error;
const selectRecipesIsLoading = (state) => state.recipes.isLoading;
const selectRecipesPageAmount = (state) => state.recipes.pageAmount;
const selectRecipesPage = (state) => state.recipes.page;

export {
  selectRecipes,
  selectRecipesError,
  selectRecipesIsLoading,
  selectRecipesPageAmount,
  selectRecipesPage,
};
