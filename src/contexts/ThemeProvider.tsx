import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
  ReactNode,
} from "react";

export type Theme = "default" | "twilight" | "sunset" | "earthen";

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_CLASSES = [
  "theme-default",
  "theme-twilight",
  "theme-sunset",
  "theme-earthen",
];

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const body = document.body;

  // limpia clases previas y aplica la nueva
  root.classList.remove(...THEME_CLASSES);
  body.classList.remove(...THEME_CLASSES);
  const cls = `theme-${theme}`;
  root.classList.add(cls);
  body.classList.add(cls);
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "default";
    return (localStorage.getItem("theme") as Theme) || "default";
  });

  // Aplica inmediatamente para evitar "flash" del tema
  useLayoutEffect(() => {
    applyThemeClass(currentTheme);
  }, [currentTheme]);

  // Persiste en localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
