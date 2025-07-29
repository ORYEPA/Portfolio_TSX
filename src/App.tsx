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

        {/* Education Section */}
        <section id="education" className={styles.section} style={getEducationBackground()}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.sectionHeader}>
                Education
              </h2>
              
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                className={styles.card}
                style={{ 
                  transformStyle: 'preserve-3d',
                  background: currentTheme === 'twilight' 
                    ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.8), rgba(71, 85, 105, 0.6))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))'
                }}
              >
                <h3 className={`${styles.cardTitle} ${currentTheme === 'twilight' ? 'text-slate-100' : 'text-gray-800'}`}>
                  Biomedical Engineering
                </h3>
                <p className={`${styles.cardSubtitle} ${currentTheme === 'twilight' ? 'text-slate-300' : 'text-gray-600'}`}>
                  Currently completing degree
                </p>
                <p className={`${styles.cardDescription} ${currentTheme === 'twilight' ? 'text-slate-200' : 'text-gray-700'}`}>
                  My studies in biomedical engineering provide me with analytical skills and 
                  a unique perspective on integrating technology with healthcare solutions, 
                  complementing my technical development skills.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={styles.section} style={getExperienceBackground()}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <h2 className={`${styles.sectionHeader} ${styles.experienceHeader}`}>
                Experience
              </h2>
            </motion.div>

            <div className={styles.jobsContainer}>
              {[
                {
                  title: 'Full Stack Developer',
                  company: 'Freelance',
                  period: '2021 - Present',
                  description: 'Building custom web applications for clients across various industries, focusing on efficiency and user experience.'
                },
                {
                  title: 'Web Developer',
                  company: 'Corporate Projects',
                  period: '2022 - Present',
                  description: 'Developing scalable web solutions and collaborating with teams using agile methodologies.'
                }
              ].map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, rotateY: index % 2 === 0 ? 3 : -3 }}
                  className={styles.jobCard}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    background: currentTheme === 'twilight' 
                      ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.8), rgba(71, 85, 105, 0.6))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))'
                  }}
                >
                  <div className={styles.jobHeader}>
                    <h3 className={`${styles.jobTitle} ${currentTheme === 'twilight' ? 'text-slate-100' : 'text-gray-800'}`}>
                      {job.title}
                    </h3>
                    <span className={styles.jobPeriod}>{job.period}</span>
                  </div>
                  <h4 className={`${styles.jobCompany} ${currentTheme === 'twilight' ? 'text-slate-300' : 'text-gray-600'}`}>
                    {job.company}
                  </h4>
                  <p className={`${styles.cardDescription} ${currentTheme === 'twilight' ? 'text-slate-200' : 'text-gray-700'}`}>
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Certificates Section */}
        <section id="certificates">
          <CertificatesSection />
        </section>

        {/* Notes Section */}
        <section id="notes">
          <NotesSection />
        </section>

        {/* Random Section */}
        <section id="random">
          <RandomSection />
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection} style={getContactBackground()}>
          <div className={styles.contactContainer}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.contactHeader}>
                Let's Connect
              </h2>
              <p className={`${styles.contactDescription} ${getContactTextColor()}`}>
                Ready to collaborate on your next project? Let's build something amazing together.
              </p>
              
              <motion.a
                href="mailto:hello@example.com"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className={styles.contactBtn}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>
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