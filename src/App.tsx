import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { NotesSection } from './components/NotesSection';
import { RandomSection } from './components/RandomSection';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { ThemeSelector } from './components/ThemeSelector';
import { Menu, X } from 'lucide-react';
import styles from './App.module.css';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentTheme, setTheme } = useTheme();

  // Handle section scrolling
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'projects', 'certificates', 'notes', 'random'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getThemeBackground = () => {
    switch (currentTheme) {
      case 'twilight':
        return { background: 'linear-gradient(135deg, #0f172a, #581c87, #1e293b)' };
      case 'sunset':
        return { background: 'linear-gradient(135deg, #fed7aa, #fecaca, #fce7f3)' };
      case 'earthen':
        return { background: 'linear-gradient(135deg, #d1fae5, #ecfdf5, #f0fdfa)' };
      default:
        return { background: 'linear-gradient(135deg, #e0e7ff, #ffffff, #f3e8ff)' };
    }
  };

  const getEducationBackground = () => {
    switch (currentTheme) {
      case 'twilight':
        return { background: 'linear-gradient(135deg, #1e293b, #581c87)' };
      case 'sunset':
        return { background: 'linear-gradient(135deg, #fed7aa, #fecaca)' };
      case 'earthen':
        return { background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' };
      default:
        return { background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)' };
    }
  };

  const getExperienceBackground = () => {
    switch (currentTheme) {
      case 'twilight':
        return { background: 'linear-gradient(135deg, #581c87, #1e293b)' };
      case 'sunset':
        return { background: 'linear-gradient(135deg, #fecaca, #fce7f3)' };
      case 'earthen':
        return { background: 'linear-gradient(135deg, #a7f3d0, #5eead4)' };
      default:
        return { background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' };
    }
  };

  const getContactBackground = () => {
    switch (currentTheme) {
      case 'twilight':
        return { background: 'linear-gradient(135deg, #0f172a, #581c87, #312e81)' };
      case 'sunset':
        return { background: 'linear-gradient(135deg, #c2410c, #dc2626, #be185d)' };
      case 'earthen':
        return { background: 'linear-gradient(135deg, #15803d, #047857, #0d9488)' };
      default:
        return { background: 'linear-gradient(135deg, #581c87, #1e3a8a, #4338ca)' };
    }
  };

  const getContactTextColor = () => {
    switch (currentTheme) {
      case 'twilight':
        return styles.contactDescTwilight;
      case 'sunset':
        return styles.contactDescSunset;
      case 'earthen':
        return styles.contactDescEarthen;
      default:
        return styles.contactDescDefault;
    }
  };

  return (
    <div className={styles.container} style={getThemeBackground()}>
      {/* Theme Selector - Fixed Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={styles.themeSelector}
      >
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setTheme} />

      </motion.div>

      {/* Desktop Sidebar */}
      <div className={styles.desktopSidebar}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={scrollToSection}
        />
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={styles.mobileMenuBtn}
      >
        {isMobileMenuOpen ? <X className={styles.icon} /> : <Menu className={styles.icon} />}
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileMenuContent}>
              <Sidebar 
                activeSection={activeSection} 
                onSectionChange={scrollToSection}
              />
            </div>
            <div 
              className={styles.mobileMenuBackdrop}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Home Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}