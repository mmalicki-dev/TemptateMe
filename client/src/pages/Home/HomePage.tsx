import { useDispatch } from "react-redux";
import { HomeInfo } from "../../components/Organisms/HomeInfo/HomeInfo.tsx";
import styles from "./HomePage.module.css";
import { fetchRecipes } from "../../redux/recipes/operations.ts";
import { useEffect } from "react";
import { HomeRecipes } from "../../components/Organisms/HomeRecipes/HomeRecipes.tsx";
import type { AppDispatch } from "../../redux/store.ts";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className={styles.HomePage}>
      <HomeInfo />
      <HomeRecipes />
    </div>
  );
};

export { HomePage };
