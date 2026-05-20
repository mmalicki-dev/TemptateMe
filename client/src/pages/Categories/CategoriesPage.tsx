import { useEffect } from "react";
import styles from "./CategoriesPage.module.css";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "../../redux/categories/operations.ts";
import { CategoriesList } from "../../components/Molecules/CategoriesList/CategoriesList.tsx";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.tsx";
import { RecipesList } from "../../components/Organisms/RecipesList/RecipesList.tsx";
import { Pagination } from "../../components/Atoms/Pagination/Pagination.tsx";
import useRecipes from "../../hooks/useRecipes.ts";
import { Helmet } from "react-helmet-async";
import type { AppDispatch } from "../../redux/store.ts";

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pageAmount } = useRecipes();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className={styles.CategoriesPage}>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <PageTitle title="Categories" />
      <CategoriesList />
      <RecipesList />
      {pageAmount > 1 && <Pagination />}
    </div>
  );
};

export { CategoriesPage };
