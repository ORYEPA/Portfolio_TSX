import React from 'react'
import { useTheme, Theme } from '../contexts/ThemeProvider'
import styles from '../styles/ThemeSelector.module.css'

const OPTIONS: { value: Theme; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'twilight', label: 'Twilight' },
  { value: 'sunset',   label: 'Sunset' },
  { value: 'earthen',  label: 'Earthen' },
]

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme()

  return (
    <div className={styles.wrapper}>
      <select
        className={styles.dropdown}
        value={currentTheme}
        onChange={e => setTheme(e.target.value as Theme)}
      >
        {OPTIONS.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
