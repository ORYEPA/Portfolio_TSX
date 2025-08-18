import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import fm from 'front-matter'
import { ChevronDown, Code, Cpu, Database } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeProvider'
import styles from '../styles/HeroSection.module.css'

type FrontMatter = {
  header: string
}

export function HeroSection() {
  const { currentTheme } = useTheme()
  const [headerText, setHeaderText] = useState<string>('')

  useEffect(() => {
    const mdUrl = `${process.env.PUBLIC_URL || ''}/content/DataInfo/Aboutme.md`
    fetch(mdUrl)
      .then(res => {
        if (!res.ok) throw new Error(`No se encontró MD en ${mdUrl}`)
        return res.text()
      })
      .then(raw => {
        const { attributes } = fm<FrontMatter>(raw)
        setHeaderText(attributes.header)
      })
      .catch(err => console.error(err))
  }, [])

  // background según tema
  const getHeroBackground = () => {
    switch (currentTheme) {
      case 'twilight': return { background: 'linear-gradient(135deg, #0f172a, #581c87, #1e293b)' }
      case 'sunset':   return { background: 'linear-gradient(135deg, #fed7aa, #fecaca, #fce7f3)' }
      case 'earthen':  return { background: 'linear-gradient(135deg, #d1fae5, #ecfdf5, #f0fdfa)' }
      default:         return { background: 'linear-gradient(135deg, #e0e7ff, #ffffff, #f3e8ff)' }
    }
  }

  const textColor = currentTheme === 'twilight' ? 'text-slate-100' : 'text-gray-800'

  if (!headerText) return null

  return (
    <section className={styles.hero} style={getHeroBackground()}>
      <div className={styles.content}>
        {/* Títulos */}
        <motion.div
          className={styles.headerSection}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={styles.mainTitle}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            ¡Hola!
          </motion.h1>
          <motion.h2
            className={`${styles.subtitle} ${textColor}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Soy Andrea Peyro
          </motion.h2>
        </motion.div>

        {/* Intro sacado del front-matter.header */}
        <motion.div
          className={styles.introSection}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className={styles.introCard}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {headerText}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Tres tarjetas: Frontend, Backend, Database */}
        <motion.div
          className={styles.cardGrid}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className={`${styles.skillCard} ${styles.skillCardSecondary}`}>
            <h3 className={styles.skillTitle}>Frontend</h3>
            <p className={styles.skillDescription}>React, Vue, Angular</p>
          </div>
          <div className={`${styles.skillCard} ${styles.skillCardPrimary}`}>
            <h3 className={styles.skillTitle}>Backend</h3>
            <p className={styles.skillDescription}>Node.js, PHP, .NET</p>
          </div>
          <div className={`${styles.skillCard} ${styles.skillCardAccent}`}>
            <h3 className={styles.skillTitle}>Database</h3>
            <p className={styles.skillDescription}>MySQL, PostgreSQL, MongoDB</p>
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className={`${styles.scrollText} ${textColor}`}>Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className={styles.scrollIcon} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
