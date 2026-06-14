import styles from "./RectangleButton.module.css";

interface RectangleButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  colorScheme?: "green" | "black" | "gray";
  onClick?: () => void;
  disabled?: boolean;
}

const RectangleButton = ({
  title,
  type = "button",
  colorScheme = "green",
  onClick = () => {},
  disabled = false,
}: RectangleButtonProps) => {
  const classes = `${styles.RectangleButton} ${styles[colorScheme]}`;
  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export { RectangleButton };
