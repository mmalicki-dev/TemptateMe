import styles from "./AddRecipe.module.css";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.jsx";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../redux/ingredients/operations.js";
import { fetchAllCategories } from "../../redux/categories/operations.js";
import { useEffect } from "react";
import { AddRecipeForm } from "../../components/Organisms/AddRecipeForm/AddRecipeForm.jsx";
import { Helmet } from "react-helmet-async";

const AddRecipePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <div className={styles.AddRecipePage}>
      <Helmet>
        <title>Add recipe</title>
      </Helmet>
      <PageTitle title="Add recipe" />
      <div className={styles.AddRecipe}>
        <div className={styles.Recipe}>
          <AddRecipeForm />
        </div>
      </div>
    </div>
  );
};

export { AddRecipePage };
