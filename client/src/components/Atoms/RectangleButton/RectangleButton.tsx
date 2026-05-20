import styles from "./RectangleButton.module.css";

interface RectangleButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  colorScheme?: "green" | "black" | "gray";
  onClick?: () => void;
}

const RectangleButton = ({
  title,
  type = "button",
  colorScheme = "green",
  onClick = () => {},
}: RectangleButtonProps) => {
  const classes = `${styles.RectangleButton} ${styles[colorScheme]}`;
  return (
    <button className={classes} type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export { RectangleButton };
