import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { ReactComponent as Icon } from "./iconAddIngredientName.svg";
import { AddDropdownList } from "../AddDropdownList/AddDropdownList.tsx";
import { useIngredients } from "../../../hooks/index.ts";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./AddIngredientName.module.css";

interface AddIngredientNameProps {
  index: number;
}

const AddIngredientName = ({ index }: AddIngredientNameProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [filter, setFilter] = useState("");
  const { ingredients } = useIngredients();
  const { isDark } = useDarkMode();

  function checkLocalStorage() {
    const stored = localStorage.getItem("recipeInfo");
    if (stored) {
      const ingredientsArray = JSON.parse(stored).ingredients;
      const ingredientId = ingredientsArray[index - 1]?.id;
      const match = ingredients.find((item) => item._id === ingredientId);
      if (match) {
        setId(match._id);
        setValue(match.ttl);
      }
    }
  }

  function updateLocalStorage(ingredientId: string) {
    const stored = localStorage.getItem("recipeInfo");
    if (!stored) return;
    const recipe = JSON.parse(stored);
    recipe.ingredients[index - 1].id = ingredientId;
    localStorage.setItem("recipeInfo", JSON.stringify(recipe));
  }

  const handleDataFromChild = (ingredientId: string) => {
    updateLocalStorage(ingredientId);
    setId(ingredientId);
  };

  const handleCloseDropdown = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.dataset.scroll) {
      setOpenDropdown(false);
      window.removeEventListener("click", handleCloseDropdown);
    }
  };

  const handleOpenDropdown = (_event: MouseEvent<HTMLButtonElement>) => {
    setOpenDropdown(true);
    setTimeout(() => {
      window.addEventListener("click", handleCloseDropdown);
    }, 100);
  };

  const changeValue = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLElement;
    setValue(target.dataset.value ?? "");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!openDropdown) setOpenDropdown(true);
    setFilter(event.target.value);
    setValue(event.target.value);
    window.addEventListener("click", handleCloseDropdown);
  };

  useEffect(() => {
    checkLocalStorage();
  });

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
