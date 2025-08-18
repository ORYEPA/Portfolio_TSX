import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";                
import styles from "../styles/ServiceCard.module.css";
import { Service } from "../../services/loadServices";
import { useNavigate } from "react-router-dom";

type Props = { service: Service };

export default function ServiceCard({ service }: Props) {
  const navigate = useNavigate();

  return (
    <motion.article
      className={`${styles.card} ${styles.gradient}`}
      data-gradient={service.color}
      whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.6 }}
    >
      {service.popular && <span className={styles.badge}>Most Popular</span>}

      <header className={styles.header}>
        <div className={styles.iconWrap}>
          <img src={service.icon} alt={`${service.title} icon`} />
        </div>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.description}>{service.description}</p>
      </header>

      <ul className={styles.features}>
        {service.features.map((f: string) => (
          <li key={f} className={styles.featureItem}>
            <CheckCircle size={18} className={styles.check} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className={styles.hr} />

      <div className={styles.timelineRow}>
        <span className={styles.timelineLabel}>Timeline</span>
        <span className={styles.timelineValue}>{service.timeline}</span>
      </div>

      <button
        className={styles.cta}
        onClick={() =>
          navigate(`/get-started?service=${encodeURIComponent(service.slug)}`)
        }
      >
        Get Started <ArrowRight size={16} />
      </button>
    </motion.article>
  );
}
