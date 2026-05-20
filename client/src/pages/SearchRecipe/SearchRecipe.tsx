import { useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import styles from "./SearchRecipe.module.css";
import {
  fetchPopularRecipes,
  fetchRecipesByQuery,
  updatePage,
} from "../../redux/recipes/operations.ts";
import { useDispatch } from "react-redux";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.tsx";
import { CurvedInput } from "../../components/Molecules/CurvedInput/CurvedInput.tsx";
import { RecipesList } from "../../components/Organisms/RecipesList/RecipesList.tsx";
import useRecipes from "../../hooks/useRecipes.ts";
import { NotFound } from "../../components/Atoms/NotFound/NotFound.tsx";
import { Helmet } from "react-helmet-async";
import { Pagination } from "../../components/Atoms/Pagination/Pagination.tsx";
import type { AppDispatch } from "../../redux/store.ts";

const SearchRecipePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const { recipes, pageAmount, page } = useRecipes();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    value ? setText(value) : setText("");
  };

  const onClick = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(text);
    dispatch(updatePage(0));
    dispatch(fetchRecipesByQuery({ query, page }));
  };

  useEffect(() => {
    if (query) {
      dispatch(fetchRecipesByQuery({ query, page }));
      return;
    }
    dispatch(fetchPopularRecipes({ page }));
  }, [dispatch, page, query]);

  return (
    <div className={styles.SearchRecipe}>
      <Helmet>
        <title>Search recipe</title>
      </Helmet>
      <PageTitle title="Search" />
      <CurvedInput
        greenOrBlack="green"
        buttonText="Search"
        placeholderText="Enter query"
        onChange={onChange}
        onSubmit={onClick}
      />
      {recipes.length > 0 ? (
        <RecipesList />
      ) : (
        <NotFound title="Try looking for something else..." />
      )}
      {pageAmount > 1 && <Pagination />}
    </div>
  );
};

export { SearchRecipePage };
