import { PropsWithChildren } from "react";
import { useEffect, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import styles from "../views/App/index.module.scss";

interface ContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ContextType>({
  theme: "",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");

    let itemChange = document.querySelector<HTMLElement>(
      `.${styles.articleThemeChange}`
    );
    if (theme === "light" && itemChange != null) {
      itemChange.style.left = "0";
    } else if (itemChange != null) {
      itemChange.style.left = "50%";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
