import { AddRecipeImage } from "../../Atoms/AddRecipeImage/AddRecipeImage.tsx";
import { AddRecipeInfo } from "../../Organisms/AddRecipeInfo/AddRecipeInfo.tsx";
import { AddIngredients } from "../AddIngredients/AddIngredients.tsx";
import { CurvedButton } from "../../Atoms/CurvedButton/CurvedButton.tsx";
import { AddPreparation } from "../../Molecules/AddPreparation/AddPreparation.tsx";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../../redux/recipes/operations.ts";
import styles from "./AddRecipeForm.module.css";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import type { AppDispatch } from "../../../redux/store.ts";

function dataUrlToFile(dataurl: string, filename = "file"): File {
  const [header, data] = dataurl.split(",");
  const mime = header.match(/:(.*?);/)![1];
  const u8arr = Uint8Array.from(atob(data), (c) => c.codePointAt(0)!);
  return new File([u8arr], filename, { type: mime });
}

const AddRecipeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isDark } = useDarkMode();
  const [recipeImage, setRecipeImage] = useState<File | undefined>();
  const [recipeInfo, setRecipeInfo] = useState<Record<string, unknown> | undefined>();

  const onChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as any;
    const {
      recipeImage,
      recipeName,
      recipeAbout,
      recipeCategory,
      recipeTime,
      recipePreparation,
    } = form;
    const ingredientNameEls = document.getElementsByName("ingredientName");
    const ingredientAmountEls = document.getElementsByName("ingredientAmount");
    const ingredientUnitEls = document.getElementsByName("ingredientUnit");
    const ingredients: Array<{ id: string; measure: string }> = [];

    for (let i = 0; i < ingredientNameEls.length; i++) {
      const nameEl = ingredientNameEls[i] as HTMLInputElement;
      const amountEl = ingredientAmountEls[i] as HTMLInputElement;
      const unitEl = ingredientUnitEls[i] as HTMLElement;
      ingredients.push({
        id: nameEl.dataset.id ?? "",
        measure: [amountEl.value, unitEl.dataset.id].join(" "),
      });
    }

    const info = {
      title: recipeName.value,
      description: recipeAbout.value,
      category: recipeCategory.value,
      time: recipeTime.value,
      instructions: recipePreparation.value,
      ingredients,
    };
    localStorage.setItem("recipeInfo", JSON.stringify(info));
    setRecipeInfo(info);
    if (recipeImage.files[0]) setRecipeImage(recipeImage.files[0]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!recipeImage || !recipeInfo) {
      Notify.failure("Please fill every field including image.");
      return;
    }
    try {
      Loading.pulse();
      const result = await dispatch(addRecipe({ recipeImage, recipeInfo })).unwrap() as any;
      localStorage.removeItem("recipeInfo");
      localStorage.removeItem("recipeImage");
      navigate(`/recipe/${result?.recipes?._id}`);
    } catch (err) {
      Notify.failure("Something went wrong.");
      console.error(err);
    } finally {
      Loading.remove();
    }
  };

  const handleReset = () => {
    setRecipeInfo(undefined);
    setRecipeImage(undefined);
    localStorage.removeItem("recipeInfo");
    localStorage.removeItem("recipeImage");
    navigate(0);
  };

  function checkLocalStorage() {
    const stored = localStorage.getItem("recipeInfo");
    const info = stored ? JSON.parse(stored) : null;
    const image = localStorage.getItem("recipeImage");
    if (info) setRecipeInfo(info);
    if (image) setRecipeImage(dataUrlToFile(image));
  }

  useEffect(() => {
    checkLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className={styles.AddRecipeForm}
      onSubmit={handleSubmit}
      onChange={onChange}
    >
      <div className={styles.ImageAndInfo}>
        <div className={styles.Image}>
          <AddRecipeImage />
        </div>
        <div className={styles.Info}>
          <AddRecipeInfo />
        </div>
      </div>
      <AddIngredients />
      <AddPreparation />
      <div className={styles.AddRecipeButton}>
        <CurvedButton
          greenOrBlack={isDark ? "green" : "black"}
          type="submit"
          title="Add recipe"
        />
      </div>
      <button className={styles.reset} type="button" onClick={handleReset}>
        Reset recipe
      </button>
    </form>
  );
};

export { AddRecipeForm };
