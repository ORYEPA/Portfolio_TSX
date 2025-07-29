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

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentTheme, setTheme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeClasses.background} transition-all duration-500`}>
      {/* Theme Selector - Fixed Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed top-6 right-6 z-50"
      >
        <ThemeSelector 
          currentTheme={currentTheme} 
          onThemeChange={setTheme} 
        />
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
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
        className={`lg:hidden fixed top-6 left-6 z-50 p-3 bg-gradient-to-br ${themeClasses.primary} text-white rounded-xl shadow-lg`}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 z-40"
          >
            <div className="w-64">
              <Sidebar 
                activeSection={activeSection} 
                onSectionChange={scrollToSection}
              />
            </div>
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ left: '256px' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Home Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Education Section */}
        <section id="education" className={`py-20 px-6 bg-gradient-to-br ${currentTheme === 'twilight' ? 'from-slate-800 to-purple-900' : currentTheme === 'sunset' ? 'from-orange-100 to-red-100' : currentTheme === 'earthen' ? 'from-green-100 to-emerald-100' : 'from-blue-50 to-indigo-50'} transition-all duration-500`}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${themeClasses.primary} bg-clip-text text-transparent mb-8`}>
                Education
              </h2>
              
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                className={`bg-gradient-to-br ${themeClasses.card} backdrop-blur-lg rounded-2xl p-8 shadow-xl mb-8 border border-white/20`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className={`text-2xl font-semibold ${themeClasses.text} mb-4`}>
                  Biomedical Engineering
                </h3>
                <p className={`text-lg ${currentTheme === 'twilight' ? 'text-slate-300' : 'text-gray-600'} mb-2`}>Currently completing degree</p>
                <p className={`${currentTheme === 'twilight' ? 'text-slate-200' : 'text-gray-700'} leading-relaxed`}>
                  My studies in biomedical engineering provide me with analytical skills and 
                  a unique perspective on integrating technology with healthcare solutions, 
                  complementing my technical development skills.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-20 px-6 bg-gradient-to-br ${currentTheme === 'twilight' ? 'from-purple-900 to-slate-800' : currentTheme === 'sunset' ? 'from-red-100 to-pink-100' : currentTheme === 'earthen' ? 'from-emerald-100 to-teal-100' : 'from-green-50 to-emerald-50'} transition-all duration-500`}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${themeClasses.secondary} bg-clip-text text-transparent mb-8`}>
                Experience
              </h2>
            </motion.div>

            <div className="space-y-8">
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
                  className={`bg-gradient-to-br ${themeClasses.card} backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className={`text-xl font-semibold ${themeClasses.text}`}>{job.title}</h3>
                    <span className={`font-medium bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent`}>{job.period}</span>
                  </div>
                  <h4 className={`text-lg ${currentTheme === 'twilight' ? 'text-slate-300' : 'text-gray-600'} mb-3`}>{job.company}</h4>
                  <p className={`${currentTheme === 'twilight' ? 'text-slate-200' : 'text-gray-700'} leading-relaxed`}>{job.description}</p>
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
        <section className={`py-20 px-6 bg-gradient-to-br ${currentTheme === 'twilight' ? 'from-slate-900 via-purple-900 to-indigo-900' : currentTheme === 'sunset' ? 'from-orange-800 via-red-800 to-pink-800' : currentTheme === 'earthen' ? 'from-green-800 via-emerald-800 to-teal-800' : 'from-purple-900 via-blue-900 to-indigo-900'} text-white transition-all duration-500`}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Let's Connect
              </h2>
              <p className={`text-lg mb-12 ${currentTheme === 'twilight' ? 'text-purple-200' : currentTheme === 'sunset' ? 'text-orange-200' : currentTheme === 'earthen' ? 'text-green-200' : 'text-purple-200'}`}>
                Ready to collaborate on your next project? Let's build something amazing together.
              </p>
              
              <motion.a
                href="mailto:hello@example.com"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-block px-8 py-4 bg-gradient-to-r ${themeClasses.primary} rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow duration-300`}
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