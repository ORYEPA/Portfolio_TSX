import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Theme = 'default' | 'twilight' | 'sunset' | 'earthen'

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'default'
  })

  useEffect(() => {
    localStorage.setItem('theme', currentTheme)
    const clsList = document.documentElement.classList
    clsList.remove('theme-default','theme-twilight','theme-sunset','theme-earthen')
    clsList.add(`theme-${currentTheme}`)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
