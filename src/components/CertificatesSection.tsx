import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import ImageWithFallback from 'react-image-fallback';
import styles from '../styles/CertificatesSection.module.css';

export function CertificatesSection() {
  const certificates = [
    {
      id: 1,
      title: 'React Developer Professional Certificate',
      issuer: 'Meta',
      date: '2023',
      credentialId: 'META-RD-2023-001',
      image: 'https://images.unsplash.com/photo-1586900470869-48884e7b7a3e?w=400&h=300&fit=crop',
      skills: ['React', 'JavaScript', 'JSX', 'State Management'],
      verified: true,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      issuer: 'FreeCodeCamp',
      date: '2022',
      credentialId: 'FCC-FSWD-2022-789',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
      verified: true,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 3,
      title: 'Python for Data Science',
      issuer: 'IBM',
      date: '2023',
      credentialId: 'IBM-PDS-2023-456',
      image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=300&fit=crop',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis'],
      verified: true,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-CP-2023-321',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      skills: ['AWS', 'Cloud Computing', 'EC2', 'S3'],
      verified: true,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 5,
      title: 'Machine Learning Specialization',
      issuer: 'Stanford University',
      date: '2024',
      credentialId: 'STAN-ML-2024-654',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      skills: ['Machine Learning', 'TensorFlow', 'Neural Networks'],
      verified: true,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 6,
      title: 'Database Design and Management',
      issuer: 'Microsoft',
      date: '2022',
      credentialId: 'MS-DDM-2022-987',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
      skills: ['SQL', 'Database Design', 'MySQL', 'PostgreSQL'],
      verified: true,
      color: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Certificates</h2>
          <p className={styles.description}>
            Professional certifications and achievements that validate my technical expertise and
            commitment to continuous learning.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className={styles.certificatesGrid}>
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ y: 100, opacity: 0, rotateX: -30 }}
              whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, rotateY: 10, rotateX: 5, z: 50 }}
              className="group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={styles.certificateCard}>
                {/* Certificate Image */}
                <div className={styles.imageContainer}>
                  <ImageWithFallback
                    src={cert.image}
                    fallbackImage={cert.image}           // <-- aquí
                    alt={cert.title}
                    className={styles.certificateImage}
                  />
                  <div className={styles.imageOverlay} />

                  {cert.verified && (
                    <div className={styles.verifiedBadge}>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      >
                        <CheckCircle className={styles.verifiedIcon} />
                      </motion.div>
                    </div>
                  )}

                  <div className={styles.credentialId}>ID: {cert.credentialId}</div>
                </div>

                {/* Certificate Content */}
                <div className={styles.content}>
                  <div className={styles.contentHeader}>
                    <h3 className={styles.certificateTitle}>{cert.title}</h3>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1, rotateZ: 15 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.externalButton}
                    >
                      <ExternalLink className={styles.externalIcon} />
                    </motion.button>
                  </div>

                  <div className={styles.issuerInfo}>
                    <Award className={styles.issuerIcon} />
                    <span className={styles.issuerName}>{cert.issuer}</span>
                  </div>

                  <div className={styles.dateInfo}>
                    <Calendar className={styles.dateIcon} />
                    <span className={styles.dateText}>{cert.date}</span>
                  </div>

                  {/* Skills */}
                  <div className={styles.skillsSection}>
                    <p className={styles.skillsLabel}>Skills Covered:</p>
                    <div className={styles.skillsContainer}>
                      {cert.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + skillIndex * 0.05 + 0.5 }}
                          className={`${styles.skillTag} bg-gradient-to-r ${cert.color}`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3D Border Effect */}
                <div className={styles.borderEffect} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Achievement Elements */}
        <div className={styles.floatingElements}>
          {/* ... */}
        </div>
      </div>
    </section>
  );
}
