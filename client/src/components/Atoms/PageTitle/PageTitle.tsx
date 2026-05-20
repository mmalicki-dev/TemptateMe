import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./PageTitle.module.css";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  const { isDark } = useDarkMode();
  return (
    <h1 className={[styles.PageTitle, isDark && styles.isDark].join(" ")}>
      {title}
    </h1>
  );
};

export { PageTitle };
