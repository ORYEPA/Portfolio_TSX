import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import CertificateCard from './CertificateCard';
import { fetchCertificates, Certificate } from '../services/certificates';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/CertificatesGrid.module.css';

interface CertificatesGridProps {
  limit?: number;
}

const CertificatesGrid = ({ limit = Infinity }: CertificatesGridProps) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isCertificatesPage =
    location.pathname === '/certificates' || location.pathname === '/certificate';

  const effectiveLimit = isCertificatesPage ? Number.POSITIVE_INFINITY : limit;

  useEffect(() => {
    fetchCertificates()
      .then(data => setCertificates(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  const goHome = () => navigate('/');
  const showMore = () => navigate('/certificates');

  return (
    <section>
      {/* Botón fijo para volver al home */}
      {isCertificatesPage && (
        <button
          className={styles.backButton}
          onClick={goHome}
        >
          ⬅ Back to Home
        </button>
      )}

      <div className={styles["certificates-container"]}>
        <div className={styles["certificates-grid"]}>
          {certificates.slice(0, effectiveLimit).map(cert => (
            <CertificateCard
              key={cert.id}
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

        {!isCertificatesPage && certificates.length > (Number.isFinite(limit) ? (limit as number) : certificates.length) && (
          <button className={styles.loadMoreButton} onClick={showMore}>
            Load more...
          </button>
        )}
      </div>
    </section>
  );
};

export default CertificatesGrid;
