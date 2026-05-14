import styles from "./MyRecipesListItem.module.css";
import { ReactComponent as TrashIcon } from "./icon-trash.svg";
import { Link } from "react-router-dom";
import { CurvedButton } from "../../Atoms/CurvedButton/CurvedButton.jsx";
import { useDispatch } from "react-redux";
import {
  fetchRecipeById,
  deleteFromFavorites,
  deleteRecipe,
} from "../../../redux/recipes/operations.js";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const MyRecipesListItem = ({ recipe, isFavorites }) => {
  const { isDark } = useDarkMode();
  const dispatch = useDispatch();
  const onClick = (id) => {
    dispatch(fetchRecipeById(id));
  };
  const removeFromFavorites = (id) => {
    dispatch(deleteFromFavorites(id));
  };
  const removeRecipe = (id) => {
    dispatch(deleteRecipe(id));
  };
  return (
    <li
      className={[styles.MyRecipesListItem, isDark && styles.isDark].join(" ")}
    >
      <img alt="Delicious recipe" src={recipe.thumb} className={styles.image} />
      <div className={styles.info}>
        <div
          onClick={() => {
            isFavorites
              ? removeFromFavorites(recipe._id)
              : removeRecipe(recipe._id);
          }}
          className={[styles.trash, isFavorites && styles.favorites].join(" ")}
        >
          <TrashIcon />
        </div>
        <p className={styles.title}>{recipe.title}</p>
        <span className={styles.description}>{recipe.description}</span>
        <div className={styles.timeButton}>
          <span className={styles.time}>{recipe.time} min</span>
          <Link to={`/recipe/${recipe._id}`} className={styles.button}>
            {!isDark && (
              <CurvedButton
                size="small"
                greenOrBlack={`${isFavorites ? "black" : "green"}`}
                onClick={() => {
                  onClick(recipe._id);
                }}
              >
                See recipe
              </CurvedButton>
            )}
            {isDark && (
              <CurvedButton
                size="small"
                greenOrBlack={`green`}
                onClick={() => {
                  onClick(recipe._id);
                }}
              >
                See recipe
              </CurvedButton>
            )}
          </Link>
        </div>
      </div>
    </li>
  );
};

export { MyRecipesListItem };
