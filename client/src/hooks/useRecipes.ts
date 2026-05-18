import { useSelector } from "react-redux";
import {
  selectRecipesIsLoading,
  selectRecipes,
  selectRecipesPageAmount,
  selectRecipesError,
  selectRecipesPage,
} from "../redux/recipes/selectors.js";

const useRecipes = () => {
  const isLoading = useSelector(selectRecipesIsLoading);
  const pageAmount = useSelector(selectRecipesPageAmount);
  const page = useSelector(selectRecipesPage);
  const recipes = useSelector(selectRecipes);
  const error = useSelector(selectRecipesError);

  return {
    isLoading,
    recipes,
    page,
    pageAmount,
    error,
  };
};

export default useRecipes;
