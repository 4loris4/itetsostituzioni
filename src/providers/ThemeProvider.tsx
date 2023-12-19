import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type ThemeMode = "device" | "dark" | "light";

type ContextType = {
  theme: ThemeMode;
  setTheme: (type: ThemeMode) => void;
};

type Props = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ContextType>({
  theme: "device",
  setTheme: () => console.error("ThemeContext used without Provider"),
});

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useLocalStorage<ThemeMode>("themeMode", "device");

  const calculateTheme = (theme: ThemeMode): Exclude<ThemeMode, "device"> => (theme != "device" ? theme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.dataset.theme = calculateTheme(theme);

    if (theme == "device") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const changeListener = () => document.documentElement.dataset.theme = calculateTheme(theme);
      media.addEventListener("change", changeListener);
      return () => media.removeEventListener("change", changeListener);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
      children={children}
    />
  );
}

export default function useTheme() {
  return useContext(ThemeContext);
}