// CertificateCard.tsx
import React from 'react';

interface CertificateCardProps {
  id: string;
  title: string;
  issuer: string;
  year: string;
  skills: string[];
  pdfUrl: string;
  imageUrl: string;
}

const CertificateCard = ({ id, title, issuer, year, skills, pdfUrl, imageUrl }: CertificateCardProps) => {
  return (
    <div className="certificate-card">
      <div className="image-container">
        <img src={imageUrl} alt={title} className="certificate-image" />
        <span className="certificate-id">ID: {id}</span>
      </div>
      <div className="certificate-body">
        <h3>{title}</h3>
        <p className="certificate-issuer">🏅 {issuer}</p>
        <p className="certificate-year">📅 {year}</p>
        <div className="skills-container">
          {skills.map((skill, idx) => (
            <span key={idx} className="skill-badge">{skill}</span>
          ))}
        </div>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Ver certificado ↗</a>
      </div>
    </div>
  );
};

export default CertificateCard;
