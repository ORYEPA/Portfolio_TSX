// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { HeroSection } from '../components/Hero/HeroSection';
import { AboutSection } from '../components/Aboutme/AboutSection';
import { ProjectsSection } from '../components/Projects/ProjectsSection';
import ServicesSection from '../components/Servicess/ServicesSection';   
import { NotesSection } from '../components/NotesSection';
import { RandomSection } from '../components/RandomSection';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { ThemeSelector } from '../components/ThemeSelector';
import CertificatesOverview from '../components//Certificate/CertificatesOverview';

import { Menu, X } from 'lucide-react';
import styles from '../styles/Home.module.css';

function HomeContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'services', 'certificates', 'notes', 'random'];
      const pos = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.appContainer}>
      <ThemeSelector />

      <aside className={styles.desktopSidebar}>
        <Sidebar activeSection={activeSection} onSectionChange={scrollToSection} />
      </aside>

      <motion.button
        className={styles.mobileMenuBtn}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsMobileMenuOpen(prev => !prev)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </motion.button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileMenuContent}>
              <Sidebar activeSection={activeSection} onSectionChange={scrollToSection} />
            </div>
            <div
              className={styles.mobileMenuBackdrop}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className={styles.mainContent}>
        <section id="home"><HeroSection /></section>
        <section id="about"><AboutSection /></section>
        <section id="services"><ServicesSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="certificates"><CertificatesOverview /></section>
        <section id="notes"><NotesSection /></section>
        {/* <section id="random"><RandomSection /></section> */}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
