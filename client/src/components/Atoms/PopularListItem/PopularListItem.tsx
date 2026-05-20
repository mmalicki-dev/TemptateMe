import type { Recipe } from "../../../types/index.ts";
import styles from "./PopularListItem.module.css";

interface PopularListItemProps {
  recipe: Recipe;
}

const PopularListItem = ({ recipe }: PopularListItemProps) => {
  return (
    <div className={styles.PopularListItem}>
      <img className={styles.image} src={recipe.preview} alt={recipe.title} />
      <div className={styles.info}>
        <p className={styles.title}>{recipe.title}</p>
        <span className={styles.about}>{recipe.description}</span>
      </div>
    </div>
  );
};

export { PopularListItem };
