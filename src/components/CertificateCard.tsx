import React from 'react';
import { ExternalLink, CalendarDays, Award } from 'lucide-react';
import styles from '../styles/CertificatesGrid.module.css'; // 👈 importante

interface CertificateCardProps {
  id: string;
  title: string;
  issuer: string;
  year: string;
  skills: string[];
  pdfUrl: string;
  imageUrl: string;
}

const CertificateCard = ({
  id,
  title,
  issuer,
  year,
  skills,
  pdfUrl,
  imageUrl,
}: CertificateCardProps) => {
  return (
    <div className={styles["certificate-card"]}>
      <div className={styles["image-container"]}>
        <img src={imageUrl} alt={title} className={styles["certificate-image"]} />
        <span className={styles["certificate-id"]}>ID: {id}</span>
        <span className={styles["certificate-check"]}>✔</span>
      </div>
      <div className={styles["certificate-body"]}>
        <div className={styles["certificate-title-row"]}>
          <h3 className={styles["certificate-title"]}>{title}</h3>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" title="Ver certificado">
            <ExternalLink size={16} />
          </a>
        </div>
        <div className={styles["certificate-meta"]}>
          <div className={styles["certificate-row"]}><Award size={14} /> {issuer}</div>
          <div className={styles["certificate-row"]}><CalendarDays size={14} /> {year}</div>
        </div>
        <div className={styles["skills-container"]}>
          {skills.map((skill, i) => (
            <span key={i} className={styles["skill-badge"]}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
