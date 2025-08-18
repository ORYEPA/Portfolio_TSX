import { ReactNode } from "react";
import styles from "../../styles/GetStarted.module.css";

export default function Card({
  title,
  subtitle,
  children,
}: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        {subtitle && <p className={styles.cardSub}>{subtitle}</p>}
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}
