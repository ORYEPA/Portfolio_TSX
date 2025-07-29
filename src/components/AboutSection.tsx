import { motion } from 'motion/react';
import { Code2, Database, Globe, Zap } from 'lucide-react';
import styles from '../styles/AboutSection.module.css';

export function AboutSection() {
  const skills = [
    {
      category: 'Frontend',
      technologies: ['React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML/CSS'],
      icon: Globe,
      color: 'skillIconSecondary'
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'PHP', '.NET', 'Python', 'Express', 'Laravel'],
      icon: Code2,
      color: 'skillIconPrimary'
    },
    {
      category: 'Database',
      technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
      icon: Database,
      color: 'skillIconAccent'
    },
    {
      category: 'Tools & Others',
      technologies: ['Git', 'Docker', 'AWS', 'Linux', 'REST APIs', 'GraphQL'],
      icon: Zap,
      color: 'skillIconPrimary'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <h2 className={styles.title}>
            About Me
          </h2>
          <p className={styles.description}>
            I'm passionate about creating efficient and scalable solutions. My journey in technology 
            has led me to develop expertise across the full stack, with a special focus on 
            building applications that make a real difference.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ y: 100, opacity: 0, rotateY: -20 }}
                whileInView={{ y: 0, opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
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
                <div className={styles.skillCard}>
                  {/* Icon */}
                  <div className={`${styles.skillIcon} ${styles[skill.color]}`}>
                    <Icon className={styles.skillIconImage} />
                  </div>

                  {/* Category */}
                  <h3 className={styles.skillCategory}>
                    {skill.category}
                  </h3>

                  {/* Technologies */}
                  <div className={styles.skillTechnologies}>
                    {skill.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (techIndex * 0.05) + 0.3 }}
                        className={styles.skillTech}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Personal Touch */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.personalSection}
        >
          <div className={styles.personalCard}>
            <h3 className={styles.personalTitle}>
              Why I Love What I Do
            </h3>
            <div className={styles.personalGrid}>
              <div className={styles.personalItem}>
                <div className={styles.personalEmoji}>🚀</div>
                <h4 className={styles.personalItemTitle}>Innovation</h4>
                <p className={styles.personalItemDescription}>
                  Always exploring new technologies and finding creative solutions to complex problems.
                </p>
              </div>
              <div className={styles.personalItem}>
                <div className={styles.personalEmoji}>🎯</div>
                <h4 className={styles.personalItemTitle}>Precision</h4>
                <p className={styles.personalItemDescription}>
                  Attention to detail and commitment to delivering high-quality, efficient code.
                </p>
              </div>
              <div className={styles.personalItem}>
                <div className={styles.personalEmoji}>🌱</div>
                <h4 className={styles.personalItemTitle}>Growth</h4>
                <p className={styles.personalItemDescription}>
                  Continuous learning and adapting to new challenges in the ever-evolving tech landscape.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}