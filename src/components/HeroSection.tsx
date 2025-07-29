import { motion } from 'motion/react';
import { ChevronDown, Code, Cpu, Database } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import styles from '../styles/HeroSection.module.css';

export function HeroSection() {
  const { currentTheme } = useTheme();

  const floatingElements = [
    { Icon: Code, position: { top: '20%', left: '10%' }, delay: 0 },
    { Icon: Cpu, position: { top: '60%', left: '15%' }, delay: 0.5 },
    { Icon: Database, position: { top: '30%', right: '10%' }, delay: 1 },
  ];

  const getHeroBackground = () => {
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

  const getTextColor = () => {
    return currentTheme === 'twilight' ? 'text-slate-100' : 'text-gray-800';
  };

  const getCardBackground = () => {
    switch (currentTheme) {
      case 'twilight':
        return 'linear-gradient(135deg, rgba(51, 65, 85, 0.8), rgba(71, 85, 105, 0.6))';
      default:
        return 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))';
    }
  };

  return (
    <section className={styles.hero} style={getHeroBackground()}>
      {/* 3D Floating Background Elements */}
      {floatingElements.map((element, index) => {
        const { Icon, position, delay } = element;
        return (
          <motion.div
            key={index}
            initial={{ scale: 0, rotateY: 180, opacity: 0 }}
            animate={{ 
              scale: 1, 
              rotateY: 0, 
              opacity: 0.1,
              y: [0, -20, 0],
              rotateX: [0, 10, 0]
            }}
            transition={{
              duration: 3,
              delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className={styles.floatingElement}
            style={position}
          >
            <Icon className={styles.floatingIcon} />
          </motion.div>
        );
      })}

      {/* Main Content */}
      <div className={styles.content}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.headerSection}
        >
          <motion.h1 
            className={styles.mainTitle}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            ¡Hola!
          </motion.h1>
          <motion.h2 
            className={`${styles.subtitle} ${getTextColor()}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Soy Andrea Peyro
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={styles.introSection}
        >
          <div 
            className={styles.introCard}
            style={{ background: getCardBackground() }}
          >
            <p className={`${styles.introText} ${getTextColor()}`}>
              I am a <span className={styles.highlight}>Full Stack developer</span> with over 3 years of experience building technology solutions focused on efficiency, data analysis, and process improvement. My approach combines solid web development skills with knowledge of databases and automation.
            </p>
          </div>
        </motion.div>

        {/* 3D Skills Cards */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className={styles.skillsGrid}
        >
          {[
            { title: 'Frontend', skills: 'React, Vue, Angular', gradient: 'skillCardSecondary' },
            { title: 'Backend', skills: 'Node.js, PHP, .NET', gradient: 'skillCardPrimary' },
            { title: 'Database', skills: 'MySQL, PostgreSQL, MongoDB', gradient: 'skillCardAccent' }
          ].map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                rotateX: 5,
                z: 50
              }}
              className="group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`${styles.skillCard} ${styles[card.gradient]}`}>
                <h3 className={styles.skillTitle}>{card.title}</h3>
                <p className={styles.skillDescription}>{card.skills}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className={styles.scrollIndicator}
        >
          <p className={`${styles.scrollText} ${getTextColor()}`}>Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className={styles.scrollIcon} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}