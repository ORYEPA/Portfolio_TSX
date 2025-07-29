import { motion } from 'motion/react';
import { ChevronDown, Code, Cpu, Database } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function HeroSection() {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const floatingElements = [
    { Icon: Code, position: { top: '20%', left: '10%' }, delay: 0 },
    { Icon: Cpu, position: { top: '60%', left: '15%' }, delay: 0.5 },
    { Icon: Database, position: { top: '30%', right: '10%' }, delay: 1 },
  ];

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${themeClasses.background} transition-all duration-500`}>
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
            className="absolute pointer-events-none"
            style={position}
          >
            <Icon className={`w-16 h-16 bg-gradient-to-r ${themeClasses.primary} bg-clip-text text-transparent`} />
          </motion.div>
        );
      })}

      {/* Main Content */}
      <div className="text-center z-10 max-w-4xl px-6">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1 
            className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${themeClasses.primary} bg-clip-text text-transparent mb-4`}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            ¡Hola!
          </motion.h1>
          <motion.h2 
            className={`text-3xl md:text-5xl font-semibold ${themeClasses.text} mb-6`}
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
          className="mb-12"
        >
          <div className={`bg-gradient-to-br ${themeClasses.card} backdrop-blur-lg rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-white/20`}>
            <p className={`text-lg md:text-xl ${themeClasses.text} leading-relaxed max-w-3xl mx-auto`}>
              I am a <span className={`font-semibold bg-gradient-to-r ${themeClasses.primary} bg-clip-text text-transparent`}>Full Stack developer</span> with over 3 years of experience building technology solutions focused on efficiency, data analysis, and process improvement. My approach combines solid web development skills with knowledge of databases and automation.
            </p>
          </div>
        </motion.div>

        {/* 3D Skills Cards */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { title: 'Frontend', skills: 'React, Vue, Angular', gradient: themeClasses.secondary },
            { title: 'Backend', skills: 'Node.js, PHP, .NET', gradient: themeClasses.primary },
            { title: 'Database', skills: 'MySQL, PostgreSQL, MongoDB', gradient: themeClasses.accent }
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
              <div className={`bg-gradient-to-br ${card.gradient} p-6 rounded-xl text-white shadow-lg transform transition-all duration-300 group-hover:shadow-2xl`}>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-sm opacity-90">{card.skills}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className={`${themeClasses.text} mb-4`}>Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className={`w-6 h-6 bg-gradient-to-r ${themeClasses.primary} bg-clip-text text-transparent`} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}