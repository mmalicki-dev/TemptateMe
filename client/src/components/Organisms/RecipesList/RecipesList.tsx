import styles from "./RecipesList.module.css";
import { SearchItem } from "../../Atoms/SearchItem/SearchItem.tsx";
import { useRecipes } from "../../../hooks/index.ts";
import { fetchRecipeById } from "../../../redux/recipes/operations.ts";
import { useDispatch } from "react-redux";
import { Loader } from "../../Atoms/Loader/Loader.tsx";
import type { AppDispatch } from "../../../redux/store.ts";

const RecipesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, isLoading } = useRecipes();

  const onClick = (id: string) => {
    dispatch(fetchRecipeById(id));
  };

  return isLoading ? (
    <Loader />
  ) : (
    Array.isArray(recipes) && (
      <ul className={styles.RecipesList}>
        {recipes.map((recipe) => (
          <li
            onClick={() => onClick(recipe._id)}
            key={recipe._id}
            className={styles.RecipesListItem}
          >
            <SearchItem id={recipe._id} title={recipe.title} imgSrc={recipe.thumb} />
          </li>
        ))}
      </ul>
    )
  );
};

export { RecipesList };
