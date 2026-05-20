import { useDispatch } from "react-redux";
import { ReactComponent as IconClock } from "./icon-clock.svg";
import { CurvedButton } from "../../Atoms/CurvedButton/CurvedButton.tsx";
import { addToFavorites } from "../../../redux/recipes/operations.ts";
import type { Recipe } from "../../../types/index.ts";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./RecipeDetails.module.css";

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.RecipeDetails}>
      <h2 className={styles.title}>{recipe.title}</h2>
      <p className={styles.info}>{recipe.description}</p>
      <CurvedButton
        onClick={() => dispatch(addToFavorites(recipe._id))}
        title="Add to favorites recipes"
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
