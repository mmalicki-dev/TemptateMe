import styles from "./HomeInfo.module.css";
import { AboutApp } from "../../Molecules/AboutApp/AboutApp.jsx";
import { CurvedInput } from "../../Molecules/CurvedInput/CurvedInput.jsx";
import { HomeToRecipes } from "../../Molecules/HomeToRecipes/HomeToRecipes.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipesByQuery } from "../../../redux/recipes/operations.js";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const HomeInfo = () => {
  const [text, setText] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useDarkMode();

  const onChange = (event) => {
    const text = event.currentTarget.value;
    text && setText(text);
    !text && setText("");
  };

  const onClick = (event) => {
    event.preventDefault();
    dispatch(fetchRecipesByQuery({ query: text }));
    navigate("/searchRecipes");
  };
  return (
    <div className={styles.HomeInfo}>
      <AboutApp />
      <div className={styles.toRecipes}>
        <HomeToRecipes />
        <div className={styles.input}>
          {!isDark && (
            <CurvedInput
              onSubmit={onClick}
              onClick={onClick}
              onChange={onChange}
              greenOrBlack="black"
              placeholderText="Search by title"
              buttonText="Search"
            />
          )}
          {isDark && (
            <CurvedInput
              onSubmit={onClick}
              onClick={onClick}
              onChange={onChange}
              greenOrBlack="green"
              placeholderText="Search by title"
              buttonText="Search"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { HomeInfo };
