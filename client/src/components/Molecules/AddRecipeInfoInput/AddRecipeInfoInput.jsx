import { useEffect, useState } from "react";
import styles from "./AddRecipeInfoInput.module.css";
import { ReactComponent as IconDropdown } from "./icon-dropdown.svg";
import { useCategories } from "../../../hooks/index.js";
import { AddDropdownList } from "../../Atoms/AddDropdownList/AddDropdownList.jsx";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const AddRecipeInfoInput = ({
  placeholder,
  idName,
  isCategory = false,
  isTime = false,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { categoriesTitles } = useCategories();
  const [value, setValue] = useState("");
  const [timeArray, setTimeArray] = useState([]);
  const { isDark } = useDarkMode();

  useEffect(() => {
    checkLocalStorage();
  });

  function checkLocalStorage() {
    if (localStorage.getItem("recipeInfo")) {
      const recipeInfo = JSON.parse(localStorage.getItem("recipeInfo"));
      idName === "recipeName" && recipeInfo.title && setValue(recipeInfo.title);
      idName === "recipeAbout" &&
        recipeInfo.description &&
        setValue(recipeInfo.description);
      isCategory && recipeInfo.category && setValue(recipeInfo.category);
      isTime && recipeInfo.time && setValue(recipeInfo.time);
      return;
    }
    isCategory && setValue("Breakfast");
    isTime && setValue("60");
  }

  const handleCloseDropdown = (event) => {
    if (!event.target.dataset.scroll) {
      setOpenDropdown(false);
      window.removeEventListener("click", handleCloseDropdown);
      return;
    }
    return;
  };

  const handleOpenDropdown = () => {
    setOpenDropdown(true);
    setTimeout(() => {
      window.addEventListener("click", handleCloseDropdown);
    }, 100);
  };

  const changeValue = (event) => {
    if (isCategory) {
      const recipeInfo = JSON.parse(localStorage.getItem("recipeInfo"));
      recipeInfo.category = event.target.dataset.value;
      localStorage.setItem("recipeInfo", JSON.stringify(recipeInfo));
    }
    if (isTime) {
      const recipeInfo = JSON.parse(localStorage.getItem("recipeInfo"));
      recipeInfo.time = event.target.dataset.value;
      localStorage.setItem("recipeInfo", JSON.stringify(recipeInfo));
    }
    setValue(event.target.dataset.value);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (isTime) {
      const array = [];
      for (let i = 10; i < 200; i = i + 5) {
        array.push(i.toString());
      }
      setTimeArray(array);
    }
  }, [isTime]);

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
          onChange={onChange}
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
            array={timeArray}
            isCentered={true}
            onItemClick={changeValue}
          />
        )}
      </div>
    </label>
  );
};

export { AddRecipeInfoInput };
