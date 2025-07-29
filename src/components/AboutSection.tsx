
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import fm from 'front-matter'
import { Code, Award, User, Coffee } from 'lucide-react'

import styles from '../styles/AboutSection.module.css'

type StatsItem = { icon: string; number: string; label: string }
type SkillItem = { name: string; percent: number; slug: string }

export function AboutSection() {
  const [front, setFront] = useState<{
    title: string
    description: string
    stats: StatsItem[]
    skills: SkillItem[]
    approach: string
  } | null>(null)

  useEffect(() => {
    const mdUrl = `${process.env.PUBLIC_URL || ''}/content/DataInfo/Aboutme.md`
    fetch(mdUrl)
      .then(res => {
        if (!res.ok) throw new Error(`No se encontró MD en ${mdUrl}`)
        return res.text()
      })
      .then(raw => {
        const { attributes } = fm<{
          title: string
          description: string
          stats: StatsItem[]
          skills: SkillItem[]
          approach: string
        }>(raw)

        setFront({
          title: attributes.title,
          description: attributes.description,
          stats: attributes.stats,
          skills: attributes.skills,
          approach: attributes.approach,
        })
      })
      .catch(err => console.error('Error cargando Aboutme.md', err))
  }, [])

  if (!front) return null

  const iconMap: Record<string, any> = { Code, Award, User, Coffee }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {front.title}
          </motion.h2>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {front.description}
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column */}
          <div>
            <div className={styles.statsGrid}>
              {front.stats.map((item, i) => {
                const Icon = iconMap[item.icon]
                return (
                  <div key={i} className={styles.statCard}>
                    <Icon className={styles.statIcon} />
                    <div className={styles.statNumber}>{item.number}</div>
                    <div className={styles.statLabel}>{item.label}</div>
                  </div>
                )
              })}
            </div>

            <div className={styles.approachCard}>
              <h3 className={styles.approachTitle}>My Approach</h3>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...p }) => <a {...p} className={styles.approachLink} />
                }}
              >
                {front.approach}
              </ReactMarkdown>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className={styles.skillsContainer}>
              <h3 className={styles.skillsHeader}>Technical Skills</h3>
              {front.skills.map(skill => (
                <div key={skill.slug} className={styles.skillRow}>
                  <div className={styles.skillName}>{skill.name}</div>
                  <div className={styles.skillBarWrapper}>
                    <div
                      className={`${styles.skillBar} ${styles[skill.slug]}`}
                      style={{ width: `${skill.percent}%` }}
                    />
                  </div>
                  <div className={styles.skillPercent}>{skill.percent}%</div>
                </div>
              ))}
            </div>

        </div>
        </div>
      </div>
    </section>
  )
}
