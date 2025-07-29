import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  currentTheme: string;
  setTheme: (theme: string) => void;
  getThemeClasses: () => {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState('default');

  const themeConfigs = {
    default: {
      primary: 'from-purple-600 to-pink-600',
      secondary: 'from-blue-500 to-cyan-500',
      accent: 'from-green-500 to-emerald-500',
      background: 'from-indigo-50 via-white to-purple-50',
      card: 'from-white/80 to-white/60',
      text: 'text-gray-800'
    },
    twilight: {
      primary: 'from-indigo-800 to-purple-900',
      secondary: 'from-blue-800 to-indigo-800',
      accent: 'from-purple-700 to-pink-800',
      background: 'from-slate-900 via-purple-900 to-slate-800',
      card: 'from-slate-800/80 to-slate-700/60',
      text: 'text-slate-100'
    },
    sunset: {
      primary: 'from-orange-500 to-red-600',
      secondary: 'from-yellow-500 to-orange-500',
      accent: 'from-pink-500 to-red-500',
      background: 'from-orange-50 via-red-50 to-pink-50',
      card: 'from-white/80 to-orange-50/60',
      text: 'text-gray-800'
    },
    earthen: {
      primary: 'from-green-700 to-emerald-800',
      secondary: 'from-amber-600 to-orange-700',
      accent: 'from-teal-600 to-green-700',
      background: 'from-green-50 via-emerald-50 to-teal-50',
      card: 'from-white/80 to-green-50/60',
      text: 'text-gray-800'
    }
  };

  const setTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
    
    // Update CSS custom properties for the theme
    const root = document.documentElement;
    const config = themeConfigs[theme as keyof typeof themeConfigs];
    
    if (config) {
      // Set theme class on body for conditional styling
      document.body.className = document.body.className
        .replace(/theme-\w+/g, '')
        .trim() + ` theme-${theme}`;
    }
  };

  const getThemeClasses = () => {
    return themeConfigs[currentTheme as keyof typeof themeConfigs] || themeConfigs.default;
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themeConfigs[savedTheme as keyof typeof themeConfigs]) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, getThemeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
}