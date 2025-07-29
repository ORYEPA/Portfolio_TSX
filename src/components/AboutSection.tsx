import { motion } from 'motion/react';
import { Award, Users, Coffee, Code2 } from 'lucide-react';

export function AboutSection() {
  const stats = [
    { icon: Code2, value: '3+', label: 'Years Experience', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, value: '50+', label: 'Projects Completed', color: 'from-purple-500 to-pink-500' },
    { icon: Users, value: '20+', label: 'Happy Clients', color: 'from-green-500 to-emerald-500' },
    { icon: Coffee, value: '1000+', label: 'Cups of Coffee', color: 'from-orange-500 to-red-500' }
  ];

  const skills = [
    { name: 'JavaScript', level: 95, color: 'bg-yellow-400' },
    { name: 'React', level: 90, color: 'bg-blue-500' },
    { name: 'Node.js', level: 88, color: 'bg-green-500' },
    { name: 'PHP', level: 85, color: 'bg-purple-500' },
    { name: 'Python', level: 82, color: 'bg-green-600' },
    { name: 'SQL', level: 90, color: 'bg-orange-500' },
    { name: 'MongoDB', level: 80, color: 'bg-green-400' },
    { name: 'Git', level: 92, color: 'bg-red-500' }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating innovative solutions that bridge technology and real-world problems. 
            My journey in tech combines analytical thinking from my biomedical engineering background with 
            hands-on development experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Stats and Description */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotateY: 180 }}
                    whileInView={{ scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 10,
                      rotateX: 5,
                      z: 50
                    }}
                    className="group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg transform transition-all duration-300 group-hover:shadow-2xl`}>
                      <Icon className="w-8 h-8 mb-3 mx-auto" />
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Description */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Approach</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                I believe in combining <span className="font-semibold text-purple-600">solid technical skills</span> with 
                <span className="font-semibold text-purple-600"> creative problem-solving</span>. My experience spans 
                both corporate environments and freelance projects, giving me insight into diverse development challenges.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Currently completing my degree in <span className="font-semibold text-purple-600">Biomedical Engineering</span>, 
                which provides me with an analytical mindset for integrating technology with healthcare solutions.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Technical Skills</h3>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-1 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1, 
                        delay: index * 0.1 + 0.5,
                        ease: "easeOut"
                      }}
                      className={`h-full ${skill.color} rounded-full relative`}
                    >
                      <motion.div
                        animate={{ 
                          x: [0, 10, 0],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-white/30 rounded-full"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating 3D Elements */}
            <div className="relative mt-8 h-32 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100">
              {['React', 'Node.js', 'Python', 'SQL'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{
                    scale: [0.8, 1, 0.8],
                    rotateY: [0, 360, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                  className={`absolute bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium text-purple-700 shadow-lg`}
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${30 + (index % 2) * 40}%`,
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}