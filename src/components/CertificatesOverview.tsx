import React, { useEffect, useState } from 'react';
import { fetchCertificates, Certificate } from '../services/certificates';
import CertificatesGrid from './CertificatesGrid';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CertificatesOverview.module.css';

const CertificatesOverview = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCertificates().then(data => {
      setCertificates(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  const skillCount: Record<string, number> = {};
  const yearCount: Record<string, number> = {};

  certificates.forEach(cert => {
    cert.skills.forEach(skill => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
    yearCount[cert.year] = (yearCount[cert.year] || 0) + 1;
  });

  const topSkills = Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const totalCourses = certificates.length;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Certificates & Skills</h2>
      <p className={styles.description}>
        Professional certifications and achievements that validate my technical expertise and commitment to continuous learning.
      </p>

      <div className={styles.columns}>
        <div className={styles.left}>
          <div className={styles.sectionTitle}>
            <span className={styles.icon}>⭐</span> Top Skills
          </div>
          {topSkills.map(([skill, count], i) => {
            const percentage = Math.round((count / totalCourses) * 100);
            return (
              <div className={styles.skillCard} key={i}>
                <div className={styles.skillHeader}>
                  <span>{skill}</span>
                  <span>{percentage}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${percentage}%`, backgroundColor: `var(--theme-progress-${i % 5})` }}
                  ></div>
                </div>
                <p className={styles.skillDetail}>{count} courses completed</p>
              </div>
            );
          })}
        </div>

        <div className={styles.right}>
          <div className={styles.sectionTitle}>
            <span className={styles.icon}>📈</span> Learning Progress
          </div>
          <div className={styles.summaryBoxes}>
            <div className={styles.box}>
              <h3>Total Courses</h3>
              <p>{totalCourses}</p>
            </div>
            <div className={styles.box}>
              <h3>Certificates</h3>
              <p>{totalCourses}</p>
            </div>
          </div>

          <div className={styles.yearsGrid}>
            {Object.entries(yearCount).map(([year, count]) => (
              <div key={year} className={styles.yearCard}>
                <h4>{year}</h4>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${(count / totalCourses) * 100}%`, backgroundColor: `var(--theme-hover)` }}
                  ></div>
                </div>
                <p>{count} certificados</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.previewGrid}>
        <CertificatesGrid limit={10} />
        
      </div>
    </section>
  );
};

export default CertificatesOverview;
