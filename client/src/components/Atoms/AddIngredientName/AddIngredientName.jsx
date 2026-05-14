import { useEffect, useState } from "react";

import { AddDropdownList } from "../../Atoms/AddDropdownList/AddDropdownList.jsx";
import { ReactComponent as Icon } from "./iconAddIngredientName.svg";

import { useIngredients } from "../../../hooks/index.js";

import styles from "./AddIngredientName.module.css";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const AddIngredientName = ({ index }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [filter, setFilter] = useState("");
  const { ingredients } = useIngredients();
  const { isDark } = useDarkMode();

  function checkLocalStorage() {
    if (localStorage.getItem("recipeInfo")) {
      const ingredientsArray = JSON.parse(
        localStorage.getItem("recipeInfo")
      ).ingredients;
      const id = ingredientsArray[index - 1]?.id;
      const test = ingredients.filter((item) => item._id === id)[0];
      setId(test?._id);
      setValue(test?.ttl);
    }
  }

  function updateLocalStorage(id) {
    const recipe = JSON.parse(localStorage.getItem("recipeInfo"));
    recipe.ingredients[index - 1].id = id;
    localStorage.setItem("recipeInfo", JSON.stringify(recipe));
  }

  const handleDataFromChild = (id) => {
    updateLocalStorage(id);
    setId(id);
  };

  const handleCloseDropdown = (event) => {
    if (!event.target.dataset.scroll) {
      setOpenDropdown(false);
      window.removeEventListener("click", handleCloseDropdown);
    }
  };

  const handleOpenDropdown = (event) => {
    setOpenDropdown(true);
    setTimeout(() => {
      window.addEventListener("click", handleCloseDropdown);
    }, 100);
  };

  const changeValue = (event) => {
    setValue(event.target.dataset.value);
  };

  const onChange = (event) => {
    !openDropdown && setOpenDropdown(true);
    setFilter(event.target.value);
    setValue(event.target.value);
    window.addEventListener("click", handleCloseDropdown);
  };
  useEffect(() => {
    checkLocalStorage();
  });
  useEffect(() => {}, [openDropdown]);
  return (
    <label
      className={[styles.AddIngredientName, isDark && styles.isDark].join(" ")}
    >
      <input
        name="ingredientName"
        className={[styles.input, isDark && styles.isDark].join(" ")}
        onChange={onChange}
        value={value}
        data-scroll=""
        data-id={id}
        required
      />
      <button
        className={styles.icon}
        type="button"
        onClick={handleOpenDropdown}
      >
        <Icon />
      </button>
      {openDropdown && (
        <AddDropdownList
          array={ingredients}
          filter={filter}
          sendDataToParent={handleDataFromChild}
          onItemClick={changeValue}
        />
      )}
    </label>
  );
};

export { AddIngredientName };
