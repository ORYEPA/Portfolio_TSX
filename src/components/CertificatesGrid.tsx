import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react'
import CertificateCard from './CertificateCard';
import { fetchCertificates, Certificate } from '../services/certificates';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CertificatesGrid.module.css'; // 👈 importante

interface CertificatesGridProps {
  limit?: number;
}

const CertificatesGrid = ({ limit = Infinity }: CertificatesGridProps) => {
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

  const showMore = () => navigate('/certificates');

  return (
     <section>
    


      <div className={styles["certificates-container"]}>
      {/* <h2 className={styles.title}>Certificates</h2>
      <p className={styles.subtitle}>
        Professional certifications that validate my technical expertise and
        commitment to continuous learning.
      </p> */}

      <div className={styles["certificates-grid"]}>
        {certificates.slice(0, limit).map((cert, index) => (
          <CertificateCard
            key={index}
            id={cert.id}
            title={cert.title}
            issuer={cert.issuer}
            year={cert.year}
            skills={cert.skills}
            pdfUrl={cert.pdfUrl}
            imageUrl={cert.imageUrl}
          />
        ))}
      </div>

      {certificates.length > limit && (
        <button className={styles.loadMoreButton} onClick={showMore}>
          Load more...
        </button>

      )}
    </div>

    </section>
  );
};

export default CertificatesGrid;
