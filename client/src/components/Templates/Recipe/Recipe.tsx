import styles from "./Recipe.module.css";
import { RecipeDetails } from "../../Molecules/RecipeDetails/RecipeDetails.tsx";
import { IngredientsList } from "../../Organisms/IngredientsList/IngredientsList.tsx";
import { PreparationList } from "../../Organisms/PreparationList/PreparationList.tsx";
import { useRecipes } from "../../../hooks/index.ts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../../../redux/recipes/operations.ts";
import { fetchShoppingList } from "../../../redux/shopping/operations.ts";
import { fetchIngredients } from "../../../redux/ingredients/operations.ts";
import { Loader } from "../../Atoms/Loader/Loader.tsx";
import type { AppDispatch } from "../../../redux/store.ts";

const Recipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentRecipe, isLoading } = useRecipes();
  const { recipeId } = useParams<{ recipeId: string }>();

  useEffect(() => {
    dispatch(fetchShoppingList());
    dispatch(fetchIngredients());
    if (recipeId) dispatch(fetchRecipeById(recipeId));
  }, [dispatch, recipeId]);

  if (isLoading || !currentRecipe) return <Loader />;

  return (
    <>
      <RecipeDetails recipe={currentRecipe} />
      <div className={styles.Recipe}>
        <IngredientsList
          ingredientsList={currentRecipe.ingredients}
          recipeId={currentRecipe._id}
          recipeName={currentRecipe.title}
        />
        <PreparationList
          preparation={currentRecipe.instructions}
          alt={currentRecipe.title}
          src={currentRecipe.thumb}
        />
      </div>
    </>
  );
};

export { Recipe };
