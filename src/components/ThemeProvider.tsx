// src/components/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// 1. Definimos la lista de IDs de tema
export type ThemeId = 'default' | 'twilight' | 'sunset' | 'earthen';

interface ThemeContextType {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // 2. Inicializamos useState con ThemeId
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('default');

  // 3. Adaptamos la firma de setTheme para usar ThemeId
  const setTheme = (theme: ThemeId) => {
    setCurrentTheme(theme);
    localStorage.setItem('portfolio-theme', theme);

    // Actualizar clase en <body>
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim() + ` theme-${theme}`;
  };

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as ThemeId | null;
    const validThemes: ThemeId[] = ['default', 'twilight', 'sunset', 'earthen'];

    if (saved && validThemes.includes(saved)) {
      setTheme(saved);
    } else {
      setTheme('default');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
