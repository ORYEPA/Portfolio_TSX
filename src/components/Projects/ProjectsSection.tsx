import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import fm from 'front-matter'
import { ExternalLink, Github } from 'lucide-react'
import styles from '../../styles/ProjectsSection.module.css'

type Project = {
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
  category: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const mdUrl = `${process.env.PUBLIC_URL || ''}/content/DataProjects/Projects.md`
    fetch(mdUrl)
      .then(res => {
        if (!res.ok) throw new Error(`Projects.md no encontrado (${res.status})`)
        return res.text()
      })
      .then(raw => {
        const { attributes } = fm<{ projects: Project[] }>(raw)
        setProjects(attributes.projects)
      })
      .catch(err => console.error('Error cargando Projects.md', err))
  }, [])

  if (!projects.length) return null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Projects</h2>
          <p className={styles.subtitle}>
            A showcase of my latest work in web development, machine learning, and data science.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.cardWrapper}
              initial={{ y: 100, opacity: 0, rotateX: -20 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5, z: 50 }}
            >
              <div className={styles.card}>
                <div className={styles.imageContainer}>
                  <img src={p.image} alt={p.title} className={styles.image} />
                  <div className={styles.overlay} />
                  <span className={styles.categoryBadge}>{p.category}</span>
                  <div className={styles.actions}>
                    {p.github && (
                      <motion.a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconBtn}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github />
                      </motion.a>
                    )}
                    {p.demo && (
                      <motion.a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconBtn}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink />
                      </motion.a>
                    )}
                  </div>
                </div>
                <div className={styles.content}>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.description}>{p.description}</p>
                  <div className={styles.techList}>
                    {p.technologies.map((tech, k) => (
                      <motion.span
                        key={tech}
                        className={styles.techTag}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 + k * 0.1 }}
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
      </div>
    </section>
  )
}
