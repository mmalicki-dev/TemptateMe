import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { ReactComponent as Icon } from "./iconAddIngredientUnit.svg";
import { AddDropdownList } from "../AddDropdownList/AddDropdownList.tsx";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./AddIngredientUnit.module.css";

interface AddIngredientUnitProps {
  index: number;
}

const unitTypes = ["tbs", "tsp", "kg", "g", "ml", "l"];

const AddIngredientUnit = ({ index }: AddIngredientUnitProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [unit, setUnit] = useState("g");
  const [amount, setAmount] = useState<number | string>(0);
  const { isDark } = useDarkMode();

  const handleCloseDropdown = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.dataset.scroll) {
      setOpenDropdown(false);
      globalThis.removeEventListener("click", handleCloseDropdown);
    }
  };

  const handleOpenDropdown = (_event: MouseEvent<HTMLButtonElement>) => {
    setOpenDropdown(true);
    setTimeout(() => {
      globalThis.addEventListener("click", handleCloseDropdown);
    }, 100);
  };

  function updateLocalStorage(newUnit: string) {
    const stored = localStorage.getItem("recipeInfo");
    if (!stored) return;
    const recipe = JSON.parse(stored);
    recipe.ingredients[index - 1].measure = [amount, newUnit].join(" ");
    localStorage.setItem("recipeInfo", JSON.stringify(recipe));
  }

  const changeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const changeUnit = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLElement;
    const newUnit = target.dataset.value ?? "g";
    updateLocalStorage(newUnit);
    setUnit(newUnit);
  };

  function checkLocalStorage() {
    const stored = localStorage.getItem("recipeInfo");
    if (stored) {
      const { ingredients } = JSON.parse(stored);
      const measure: string[] =
        ingredients[index - 1]?.measure?.split(" ") ?? [];
      setAmount(measure[0]?.length > 0 ? measure[0] : 0);
      setUnit(measure[1]?.length > 0 ? measure[1] : "g");
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
        readOnly
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
