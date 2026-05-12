import { useEffect } from "react";
import styles from "./CategoriesPage.module.css";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "../../redux/categories/operations.js";
import { CategoriesList } from "../../components/Molecules/CategoriesList/CategoriesList.jsx";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.jsx";
import { RecipesList } from "../../components/Organisms/RecipesList/RecipesList.jsx";
import { Pagination } from "../../components/Atoms/Pagination/Pagination.jsx";
import useRecipes from "../../hooks/useRecipes.js";
import { Helmet } from "react-helmet-async";

const CategoriesPage = () => {
  const dispatch = useDispatch();
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
