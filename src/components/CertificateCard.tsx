import React from 'react';
import { ExternalLink, CalendarDays, Award } from 'lucide-react';

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
    <div className="certificate-card">
      <div className="image-container">
        <img src={imageUrl} alt={title} className="certificate-image" />
        <span className="certificate-id">ID: {id}</span>
        <span className="certificate-check">✔</span>
      </div>
      <div className="certificate-body">
        <div className="certificate-title-row">
          <h3 className="certificate-title">{title}</h3>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" title="Ver certificado">
            <ExternalLink size={16} />
          </a>
        </div>
        <div className="certificate-meta">
          <div className="certificate-row"><Award size={14} /> {issuer}</div>
          <div className="certificate-row"><CalendarDays size={14} /> {year}</div>
        </div>
        <div className="skills-container">
          {skills.map((skill, i) => (
            <span key={i} className="skill-badge">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
