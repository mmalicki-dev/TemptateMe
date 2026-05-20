import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import Resizer from "react-image-file-resizer";
import { ReactComponent as Icon } from "./iconAddRecipeImage.svg";
import styles from "./AddRecipeImage.module.css";

const resizeFile = (image: File): Promise<string> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      image,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => resolve(uri as string),
      "base64",
    );
  });

const AddRecipeImage = () => {
  const [imagePath, setImagePath] = useState<string | undefined>();

  useEffect(() => {
    const recipeImage = localStorage.getItem("recipeImage");
    if (recipeImage) setImagePath(recipeImage);
  }, [setImagePath]);

  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      const image = await resizeFile(file);
      setImagePath(image);
      localStorage.setItem("recipeImage", image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <label className={styles.iconContainer} htmlFor="image">
      <input
        type="file"
        name="image"
        id="recipeImage"
        accept="image/png, image/jpg, image/jpeg"
        className={styles.input}
        onChange={onUpload}
      />
      {!imagePath && (
        <div className={styles.icon}>
          <Icon />
        </div>
      )}
      {imagePath && (
        <img
          className={styles.imageBackground}
          src={imagePath}
          alt="Preview"
        />
      )}
    </label>
  );
};

export { AddRecipeImage };
