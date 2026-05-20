import styles from "./AddIngredients.module.css";
import { AddRecipeHeader } from "../../Atoms/AddRecipeHeader/AddRecipeHeader.tsx";
import { AddIngredientsCounter } from "../../Atoms/AddIngredientsCounter/AddIngredientsCounter.tsx";
import { AddIngredientsItem } from "../../Molecules/AddIngredientsItem/AddIngredientsItem.tsx";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

const AddIngredients = () => {
  const [counter, setCounter] = useState<number[]>([]);

  function checkLocalStorage() {
    if (localStorage.getItem("recipeInfo")) {
      const recipe = JSON.parse(localStorage.getItem("recipeInfo")!) as { ingredients?: unknown[] };
      createArray(recipe?.ingredients?.length ?? 0);
      return;
    }
    setCounter([1]);
  }

  function createArray(length: number) {
    const array: number[] = [];
    for (let index = 0; index < length; index++) {
      array.push(index + 1);
    }
    setCounter(array);
  }

  const handleMinus = () => {
    if (counter.length > 1) {
      const copyArray = counter.slice(0, -1);
      setCounter(copyArray);
      const recipe = JSON.parse(localStorage.getItem("recipeInfo")!) as { ingredients: unknown[] };
      recipe.ingredients = recipe.ingredients.slice(0, -1);
      localStorage.setItem("recipeInfo", JSON.stringify(recipe));
    }
  };

  const handlePlus = () => {
    const copyArray = [...counter];
    copyArray.push(copyArray[copyArray.length - 1] + 1);
    setCounter(copyArray);
    const recipe = JSON.parse(localStorage.getItem("recipeInfo")!) as { ingredients: Array<{ id: null; measure: string }> };
    recipe.ingredients.push({ id: null, measure: "0 g" });
    localStorage.setItem("recipeInfo", JSON.stringify(recipe));
  };

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    const value = (event.target as HTMLElement).closest("button")?.dataset.counter;
    if (counter.length > 1) {
      const copyArray = counter.filter((item) => item !== Number(value));
      setCounter(copyArray);
      const recipe = JSON.parse(localStorage.getItem("recipeInfo")!) as { ingredients: unknown[] };
      recipe.ingredients = recipe.ingredients.filter((_, index) => index !== Number(value) - 1);
      localStorage.setItem("recipeInfo", JSON.stringify(recipe));
    }
  };

  useEffect(() => {}, [counter]);

  useEffect(() => {
    checkLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.AddIngredients}>
      <div className={styles.header}>
        <AddRecipeHeader>Ingredients</AddRecipeHeader>
        <AddIngredientsCounter
          minusCb={handleMinus}
          plusCb={handlePlus}
          counter={counter.length}
        />
      </div>
      <div className={styles.inputsStyles}>
        <ul className={styles.inputs}>
          {counter.map(
            (item) =>
              item !== 0 && (
                <AddIngredientsItem key={item} id={item} onClose={handleClose} />
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export { AddIngredients };
