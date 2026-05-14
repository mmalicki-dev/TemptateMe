import { ReactComponent as Icon } from "./iconAddIngredientUnit.svg";
import { useEffect, useState } from "react";

import { AddDropdownList } from "../../Atoms/AddDropdownList/AddDropdownList.jsx";

import styles from "./AddIngredientUnit.module.css";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const AddIngredientUnit = ({ index }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [unit, setUnit] = useState("g");
  const [amount, setAmount] = useState(0);
  const unitTypes = ["tbs", "tsp", "kg", "g", "ml", "l"];
  const { isDark } = useDarkMode();

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

  function updateLocalStorage(newUnit = false) {
    const recipe = JSON.parse(localStorage.getItem("recipeInfo"));
    newUnit &&
      (recipe.ingredients[index - 1].measure = [amount, newUnit].join(" "));
    localStorage.setItem("recipeInfo", JSON.stringify(recipe));
  }

  const changeAmount = (event) => {
    event.target.dataset.id = event.target.value;
    setAmount(event.target.value);
  };

  const changeUnit = (event) => {
    updateLocalStorage(event.target.dataset.value);
    setUnit(event.target.dataset.value);
  };

  function checkLocalStorage() {
    if (localStorage.getItem("recipeInfo")) {
      const { ingredients } = JSON.parse(localStorage.getItem("recipeInfo"));
      const measure = ingredients[index - 1]?.measure.split(" ") || [];
      measure[0]?.length > 0 ? setAmount(measure[0]) : setAmount(0);
      measure[1]?.length > 0 ? setUnit(measure[1]) : setUnit("g");
      return;
    }
  }
  useEffect(() => {
    checkLocalStorage();
  });
  return (
    <label
      className={[styles.AddIngredientUnit, isDark && styles.isDark].join(" ")}
    >
      <input
        name="ingredientAmount"
        className={styles.inputAmount}
        type="text"
        autoComplete="off"
        value={amount}
        onChange={changeAmount}
        required
      />
      <input
        name="ingredientUnit"
        className={styles.inputUnit}
        readOnly="readOnly"
        value={unit}
        data-id={unit}
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
          array={unitTypes}
          isCentered={true}
          onItemClick={changeUnit}
        />
      )}
    </label>
  );
};

export { AddIngredientUnit };
