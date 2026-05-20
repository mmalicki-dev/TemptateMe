import styles from "./PreparationImage.module.css";

interface PreparationImageProps {
  src: string;
  alt: string;
}

const PreparationImage = ({ src, alt }: PreparationImageProps) => {
  return <img alt={alt} src={src} className={styles.PreparationImage} />;
};

export { PreparationImage };
