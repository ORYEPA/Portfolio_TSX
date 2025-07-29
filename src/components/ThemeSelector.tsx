import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown, Sun, Moon, Sunset, TreePine } from 'lucide-react';
import styles from '../styles/ThemeSelector.module.css';

export type ThemeId = 'default' | 'twilight' | 'sunset' | 'earthen';

interface Theme {
  id: ThemeId;
  name: string;
  icon: React.ComponentType<any>;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  preview: string;
}

interface ThemeSelectorProps {
  currentTheme: ThemeId;
  onThemeChange: (themeId: ThemeId) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const themes: Theme[] = [
    {
      id: 'default',
      name: 'Default',
      icon: Sun,
      colors: {
        primary: 'linear-gradient(135deg, #9333ea, #ec4899)',
        secondary: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        accent: 'linear-gradient(135deg, #10b981, #059669)'
      },
      preview: 'linear-gradient(to right, #9333ea, #ec4899, #3b82f6)'
    },
    {
      id: 'twilight',
      name: 'Twilight',
      icon: Moon,
      colors: {
        primary: 'linear-gradient(135deg, #1e1b4b, #581c87)',
        secondary: 'linear-gradient(135deg, #1e3a8a, #1e1b4b)',
        accent: 'linear-gradient(135deg, #7c3aed, #be185d)'
      },
      preview: 'linear-gradient(to right, #1e1b4b, #581c87, #1e3a8a)'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      icon: Sunset,
      colors: {
        primary: 'linear-gradient(135deg, #f97316, #dc2626)',
        secondary: 'linear-gradient(135deg, #eab308, #f97316)',
        accent: 'linear-gradient(135deg, #ec4899, #dc2626)'
      },
      preview: 'linear-gradient(to right, #f97316, #dc2626, #ec4899)'
    },
    {
      id: 'earthen',
      name: 'Earthen',
      icon: TreePine,
      colors: {
        primary: 'linear-gradient(135deg, #15803d, #065f46)',
        secondary: 'linear-gradient(135deg, #d97706, #c2410c)',
        accent: 'linear-gradient(135deg, #0d9488, #15803d)'
      },
      preview: 'linear-gradient(to right, #15803d, #065f46, #0d9488)'
    }
  ];

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0];
  const CurrentIcon = currentThemeData.icon;

  return (
    <div className={styles.container}>
      {/* Theme Selector Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        whileTap={{ scale: 0.95 }}
        className={styles.selector}
        type="button"
      >
        <div
          className={styles.preview}
          style={{ background: currentThemeData.preview }}
        />
        <div className={styles.info}>
          <CurrentIcon className={styles.icon} />
          <span className={styles.name}>{currentThemeData.name}</span>
        </div>
        <motion.div
          animate={{ rotateZ: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.backdrop}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, rotateX: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={styles.dropdown}
            >
              {/* ...rest of code unchanged... */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
