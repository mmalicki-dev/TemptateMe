import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as TrashIcon } from "./icon-trash.svg";
import { CurvedButton } from "../../Atoms/CurvedButton/CurvedButton.tsx";
import {
  fetchRecipeById,
  deleteFromFavorites,
  deleteRecipe,
} from "../../../redux/recipes/operations.ts";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import { useDemoMode } from "../../../hooks/index.ts";
import type { Recipe } from "../../../types/index.ts";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./MyRecipesListItem.module.css";

interface MyRecipesListItemProps {
  recipe: Recipe;
  isFavorites?: boolean;
}

const MyRecipesListItem = ({
  recipe,
  isFavorites = false,
}: MyRecipesListItemProps) => {
  const { isDark } = useDarkMode();
  const isDemo = useDemoMode();
  const dispatch = useDispatch<AppDispatch>();

  const onRemove = () => {
    if (isDemo) return;
    if (isFavorites) dispatch(deleteFromFavorites(recipe._id));
    else dispatch(deleteRecipe(recipe._id));
  };

  return (
    <li
      className={[styles.MyRecipesListItem, isDark && styles.isDark].join(" ")}
    >
      <img alt="Delicious recipe" src={recipe.thumb} className={styles.image} />
      <div className={styles.info}>
        <button
          onClick={onRemove}
          disabled={isDemo}
          className={[styles.trash, isFavorites && styles.favorites].join(" ")}
        >
          <TrashIcon />
        </button>
        <p className={styles.title}>{recipe.title}</p>
        <span className={styles.description}>{recipe.description}</span>
        <div className={styles.timeButton}>
          <span className={styles.time}>{recipe.time} min</span>
          <Link to={`/recipe/${recipe._id}`} className={styles.button}>
            <CurvedButton
              size="small"
              greenOrBlack={
                ((isDark && "green") ?? isFavorites) ? "black" : "green"
              }
              onClick={() => dispatch(fetchRecipeById(recipe._id))}
            >
              See recipe
            </CurvedButton>
          </Link>
        </div>
      </div>
    </li>
  );
};

export { MyRecipesListItem };
