import { useDispatch } from "react-redux";
import { SearchItem } from "../../Atoms/SearchItem/SearchItem.tsx";
import { fetchRecipeById } from "../../../redux/recipes/operations.ts";
import type { Recipe } from "../../../types/index.ts";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./HomeRecipesList.module.css";

interface HomeRecipesListProps {
  recipes: Recipe[];
}

const HomeRecipesList = ({ recipes }: HomeRecipesListProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return recipes ? (
    <ul className={styles.HomeRecipesList}>
      {recipes.map((recipe) => (
        <li className={styles.listItem} key={recipe._id}>
          <button onClick={() => dispatch(fetchRecipeById(recipe._id))}>
            <SearchItem
              id={recipe._id}
              title={recipe.title}
              imgSrc={recipe.thumb}
            />
          </button>
        </li>
      ))}
    </ul>
  ) : null;
};

export { HomeRecipesList };
