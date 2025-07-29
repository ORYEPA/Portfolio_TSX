import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, ChevronDown, Sun, Moon, Sunset, TreePine } from 'lucide-react';

interface Theme {
  id: string;
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
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const themes: Theme[] = [
    {
      id: 'default',
      name: 'Default',
      icon: Sun,
      colors: {
        primary: 'from-purple-600 to-pink-600',
        secondary: 'from-blue-500 to-cyan-500',
        accent: 'from-green-500 to-emerald-500'
      },
      preview: 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500'
    },
    {
      id: 'twilight',
      name: 'Twilight',
      icon: Moon,
      colors: {
        primary: 'from-indigo-800 to-purple-900',
        secondary: 'from-blue-800 to-indigo-800',
        accent: 'from-purple-700 to-pink-800'
      },
      preview: 'bg-gradient-to-r from-indigo-800 via-purple-800 to-blue-900'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      icon: Sunset,
      colors: {
        primary: 'from-orange-500 to-red-600',
        secondary: 'from-yellow-500 to-orange-500',
        accent: 'from-pink-500 to-red-500'
      },
      preview: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-600'
    },
    {
      id: 'earthen',
      name: 'Earthen',
      icon: TreePine,
      colors: {
        primary: 'from-green-700 to-emerald-800',
        secondary: 'from-amber-600 to-orange-700',
        accent: 'from-teal-600 to-green-700'
      },
      preview: 'bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700'
    }
  ];

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0];
  const CurrentIcon = currentThemeData.icon;

  return (
    <div className="relative">
      {/* Theme Selector Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-3 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={`w-6 h-6 rounded-lg ${currentThemeData.preview}`}></div>
        <div className="flex items-center space-x-2">
          <CurrentIcon className="w-4 h-4 text-gray-700" />
          <span className="text-gray-700 font-medium">{currentThemeData.name}</span>
        </div>
        <motion.div
          animate={{ rotateZ: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
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
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, rotateX: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="p-2">
                <div className="flex items-center space-x-2 px-3 py-2 border-b border-gray-100 mb-2">
                  <Palette className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Choose Theme</span>
                </div>

                {themes.map((theme, index) => {
                  const Icon = theme.icon;
                  const isSelected = theme.id === currentTheme;

                  return (
                    <motion.button
                      key={theme.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onThemeChange(theme.id);
                        setIsOpen(false);
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        rotateY: 2,
                        x: 4
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-gray-100 to-gray-50 shadow-sm' 
                          : 'hover:bg-gray-50'
                      }`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Theme Preview */}
                      <div className={`w-8 h-6 rounded-md ${theme.preview} shadow-sm flex-shrink-0`}>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-full h-full rounded-md bg-white/20 flex items-center justify-center"
                          >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </motion.div>
                        )}
                      </div>

                      {/* Theme Info */}
                      <div className="flex-1 flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-gray-600" />
                        <span className={`font-medium ${isSelected ? 'text-gray-800' : 'text-gray-700'}`}>
                          {theme.name}
                        </span>
                      </div>

                      {/* Selected Indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotateZ: -90 }}
                          animate={{ scale: 1, rotateZ: 0 }}
                          className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Themes update the entire portfolio
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}