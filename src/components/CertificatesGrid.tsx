// components/CertificatesGrid.tsx
import React, { useEffect, useState } from 'react';
import CertificateCard from './CertificateCard';
import { fetchCertificates, Certificate } from '../services/certificates';
import { useNavigate } from 'react-router-dom';
import '../styles/certificates.css';

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
    <div className="certificates-container">
      {certificates.slice(0, limit).map((cert, index) => (
        <CertificateCard
          key={index}
          id={cert.id}
          title={cert.title}       // antes "name", ahora "title"
          issuer={cert.issuer}
          year={cert.year}
          skills={cert.skills}
          pdfUrl={cert.pdfUrl}
          imageUrl={cert.imageUrl}
        />
      ))}
      {certificates.length > limit && (
        <button className="load-more-button" onClick={showMore}>
          Loading more...
        </button>
      )}
    </div>
  );
};

export default CertificatesGrid;
