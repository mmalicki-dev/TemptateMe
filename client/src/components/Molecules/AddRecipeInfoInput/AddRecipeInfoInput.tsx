import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { ReactComponent as IconDropdown } from "./icon-dropdown.svg";
import { AddDropdownList } from "../../Atoms/AddDropdownList/AddDropdownList.tsx";
import { useCategories } from "../../../hooks/index.ts";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./AddRecipeInfoInput.module.css";

interface AddRecipeInfoInputProps {
  placeholder: string;
  idName: string;
  isCategory?: boolean;
  isTime?: boolean;
}

const TIME_OPTIONS = Array.from({ length: 38 }, (_, i) =>
  String(10 + i * 5),
);

const AddRecipeInfoInput = ({
  placeholder,
  idName,
  isCategory = false,
  isTime = false,
}: AddRecipeInfoInputProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");
  const { categoriesTitles } = useCategories();
  const { isDark } = useDarkMode();

  useEffect(() => {
    const stored = localStorage.getItem("recipeInfo");
    if (stored) {
      const recipeInfo = JSON.parse(stored);
      if (idName === "recipeName" && recipeInfo.title) setValue(recipeInfo.title);
      if (idName === "recipeAbout" && recipeInfo.description) setValue(recipeInfo.description);
      if (isCategory && recipeInfo.category) setValue(recipeInfo.category);
      if (isTime && recipeInfo.time) setValue(recipeInfo.time);
    } else {
      if (isCategory) setValue("Breakfast");
      if (isTime) setValue("60");
    }
  });

  const handleCloseDropdown = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.dataset.scroll) {
      setOpenDropdown(false);
      window.removeEventListener("click", handleCloseDropdown);
    }
  };

  const handleOpenDropdown = () => {
    setOpenDropdown(true);
    setTimeout(() => {
      window.addEventListener("click", handleCloseDropdown);
    }, 100);
  };

  const changeValue = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLElement;
    const newValue = target.dataset.value ?? "";
    const stored = localStorage.getItem("recipeInfo");
    if (stored && (isCategory || isTime)) {
      const recipeInfo = JSON.parse(stored);
      if (isCategory) recipeInfo.category = newValue;
      if (isTime) recipeInfo.time = newValue;
      localStorage.setItem("recipeInfo", JSON.stringify(recipeInfo));
    }
    setValue(newValue);
  };

  return (
    <label
      className={[styles.AddCategoryInfo, isDark && styles.isDark].join(" ")}
    >
      {placeholder}
      <div
        className={[styles.inputContainer, isDark && styles.isDark].join(" ")}
      >
        <input
          id={idName}
          className={styles.input}
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          value={value}
          data-scroll=""
          required
        />
        {isTime && "min"}
        {(isCategory || isTime) && (
          <button
            className={styles.icon}
            type="button"
            onClick={handleOpenDropdown}
          >
            <IconDropdown />
          </button>
        )}
        {isCategory && openDropdown && (
          <AddDropdownList array={categoriesTitles} onItemClick={changeValue} />
        )}
        {isTime && openDropdown && (
          <AddDropdownList
            array={TIME_OPTIONS}
            isCentered={true}
            onItemClick={changeValue}
          />
        )}
      </div>
    </label>
  );
};

export { AddRecipeInfoInput };
