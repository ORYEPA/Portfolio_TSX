// src/App.tsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sidebar } from './components/Sidebar'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ProjectsSection } from './components/ProjectsSection'
import { CertificatesSection } from './components/CertificatesSection'
import { NotesSection } from './components/NotesSection'
import { RandomSection } from './components/RandomSection'
import { ThemeProvider } from './contexts/ThemeProvider'
import { ThemeSelector } from './components/ThemeSelector'
import { Menu, X } from 'lucide-react'
import styles from './App.module.css'

function AppContent() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll to a section and close mobile menu
  const scrollToSection = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMobileMenuOpen(false)
  }

  // Scroll-spy to update activeSection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home','about','projects','certificates','notes','random']
      const pos = window.scrollY + 120
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.appContainer}>
      {/* Selector de tema fijo */}
      <ThemeSelector />

      {/* Sidebar desktop */}
      <aside className={styles.desktopSidebar}>
        <Sidebar activeSection={activeSection} onSectionChange={scrollToSection} />
      </aside>

      {/* Botón menú móvil */}
      <motion.button
        className={styles.mobileMenuBtn}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsMobileMenuOpen(prev => !prev)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </motion.button>

      {/* Sidebar móvil */}
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

      {/* Contenido principal */}
      <main className={styles.mainContent}>
        <section id="home"><HeroSection /></section>
        <section id="about"><AboutSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="certificates"><CertificatesSection /></section>
        <section id="notes"><NotesSection /></section>
        <section id="random"><RandomSection /></section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
