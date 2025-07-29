import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import ImageWithFallback from 'react-image-fallback';
import styles from '../styles/ProjectsSection.module.css';

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'CNN Classifications',
      description:
        'Advanced medical image classification system using Convolutional Neural Networks to analyze X-ray images and provide automated diagnostic assistance.',
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      github: 'https://github.com',
      demo: 'https://demo.example.com',
      category: 'AI/ML',
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description:
        'Full-stack e-commerce solution with real-time inventory management, payment processing, and advanced analytics dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      github: 'https://github.com',
      demo: 'https://demo.example.com',
      category: 'Web Development',
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      description:
        'Interactive business intelligence dashboard for real-time data visualization and automated reporting with predictive analytics.',
      technologies: ['Vue.js', 'D3.js', 'PostgreSQL', 'Python'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      github: 'https://github.com',
      demo: 'https://demo.example.com',
      category: 'Data Science',
    },
    {
      id: 4,
      title: 'Mobile Health App',
      description:
        'Cross-platform mobile application for health monitoring with IoT device integration and personalized health recommendations.',
      technologies: ['React Native', 'Firebase', 'IoT', 'Machine Learning'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      github: 'https://github.com',
      demo: 'https://demo.example.com',
      category: 'Mobile Development',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <h2 className={styles.title}>
            Projects
          </h2>
          <p className={styles.subtitle}>
            A showcase of my latest work in web development, machine learning, and data science.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 100, opacity: 0, rotateX: -30 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5, z: 50 }}
              className={styles.cardWrapper}
            >
              <div className={styles.card}>
                <div className={styles.imageContainer}>
                  <ImageWithFallback
                    src={project.image}
                    fallbackImage={project.image}
                    alt={project.title}
                    className={styles.image}
                  />
                  <div className={styles.overlay} />

                  <span className={styles.categoryBadge}>
                    {project.category}
                  </span>

                  <div className={styles.actions}>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.iconBtn}
                    >
                      <Github />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.iconBtn}
                    >
                      <ExternalLink />
                    </motion.a>
                  </div>
                </div>

                <div className={styles.content}>
                  <h3 className={styles.projectTitle}>
                    {project.title}
                  </h3>
                  <p className={styles.description}>
                    {project.description}
                  </p>

                  <div className={styles.techList}>
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + techIndex * 0.1 }}
                        className={styles.techTag}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className={styles.viewMore}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            className={styles.viewMoreBtn}
          >
            <Eye className={styles.eyeIcon} />
            View More Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
