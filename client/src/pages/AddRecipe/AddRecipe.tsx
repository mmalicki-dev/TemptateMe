import styles from "./AddRecipe.module.css";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.tsx";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../redux/ingredients/operations.ts";
import { fetchAllCategories } from "../../redux/categories/operations.ts";
import { useEffect } from "react";
import { AddRecipeForm } from "../../components/Organisms/AddRecipeForm/AddRecipeForm.tsx";
import { Helmet } from "react-helmet-async";
import type { AppDispatch } from "../../redux/store.ts";

const AddRecipePage = () => {
  const dispatch = useDispatch<AppDispatch>();

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
