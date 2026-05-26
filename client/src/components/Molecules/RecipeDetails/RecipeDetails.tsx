import { useDispatch } from "react-redux";
import { ReactComponent as IconClock } from "./icon-clock.svg";
import { CurvedButton } from "../../Atoms/CurvedButton/CurvedButton.tsx";
import { addToFavorites, deleteFromFavorites, fetchRecipeById } from "../../../redux/recipes/operations.ts";
import { useAuth } from "../../../hooks/index.ts";
import type { Recipe } from "../../../types/index.ts";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./RecipeDetails.module.css";

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  const isFavorite = user ? recipe.favorites.includes(user._id) : false;

  const handleFavoriteToggle = async () => {
    const action = isFavorite ? deleteFromFavorites(recipe._id) : addToFavorites(recipe._id);
    try {
      await dispatch(action).unwrap();
    } catch {
      // ignore toggle errors, re-fetch regardless
    }
    dispatch(fetchRecipeById(recipe._id));
  };

  return (
    <div className={styles.RecipeDetails}>
      <h2 className={styles.title}>{recipe.title}</h2>
      <p className={styles.info}>{recipe.description}</p>
      <CurvedButton
        onClick={handleFavoriteToggle}
        title={isFavorite ? "Remove from favorites" : "Add to favorites recipes"}
        isTransparent={true}
      />
      <div className={styles.time}>
        <div className={styles.icon}>
          <IconClock />
        </div>{" "}
        {recipe.time} min
      </div>
    </div>
  );
};

export { RecipeDetails };
