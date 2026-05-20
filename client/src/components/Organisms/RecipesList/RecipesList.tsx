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

  if (isLoading) return <Loader />;
  return (
    Array.isArray(recipes) && (
      <ul className={styles.RecipesList}>
        {recipes.map((recipe) => (
          <li key={recipe._id} className={styles.RecipesListItem}>
            <button onClick={() => onClick(recipe._id)}>
              <SearchItem
                id={recipe._id}
                title={recipe.title}
                imgSrc={recipe.thumb}
              />
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

export { RecipesList };
