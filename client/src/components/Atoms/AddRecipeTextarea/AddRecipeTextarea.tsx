import { useEffect, useState } from "react";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./AddRecipeTextarea.module.css";

const AddRecipeTextarea = () => {
  const [value, setValue] = useState<string | undefined>();
  const { isDark } = useDarkMode();

  useEffect(() => {
    const stored = localStorage.getItem("recipeInfo");
    if (stored) {
      const { instructions } = JSON.parse(stored);
      setValue(instructions);
    }
  });

  return (
    <div
      className={[
        styles.AddRecipeDescriptionTextarea,
        isDark && styles.isDark,
      ].join(" ")}
    >
      <textarea
        id="recipePreparation"
        className={[
          styles.AddRecipeDescriptionInput,
          isDark && styles.isDark,
        ].join(" ")}
        value={value}
        placeholder="Enter recipe. Use enter to add steps."
        required
      />
    </div>
  );
};

export { AddRecipeTextarea };
