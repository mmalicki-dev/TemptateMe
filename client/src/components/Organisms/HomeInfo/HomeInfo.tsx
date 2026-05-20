import styles from "./HomeInfo.module.css";
import { AboutApp } from "../../Molecules/AboutApp/AboutApp.tsx";
import { CurvedInput } from "../../Molecules/CurvedInput/CurvedInput.tsx";
import { HomeToRecipes } from "../../Molecules/HomeToRecipes/HomeToRecipes.tsx";
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipesByQuery } from "../../../redux/recipes/operations.ts";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import type { AppDispatch } from "../../../redux/store.ts";

const HomeInfo = () => {
  const [text, setText] = useState<string | undefined>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isDark } = useDarkMode();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    value ? setText(value) : setText("");
  };

  const onClick = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchRecipesByQuery({ query: text, page: 0 }));
    navigate("/searchRecipes");
  };

  return (
    <div className={styles.HomeInfo}>
      <AboutApp />
      <div className={styles.toRecipes}>
        <HomeToRecipes />
        <div className={styles.input}>
          <CurvedInput
            onSubmit={onClick}
            onChange={onChange}
            greenOrBlack={isDark ? "green" : "black"}
            placeholderText="Search by title"
            buttonText="Search"
          />
        </div>
      </div>
    </div>
  );
};

export { HomeInfo };
