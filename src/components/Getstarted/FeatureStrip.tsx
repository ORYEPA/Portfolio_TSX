import { Clock, UserRoundCheck, BadgeCheck } from "lucide-react";
import styles from "../../styles/GetStarted.module.css";

export default function FeatureStrip() {
  const items = [
    { Icon: Clock, title: "Fast Response", desc: "We’ll get back to you within 2 business hours" },
    { Icon: UserRoundCheck, title: "Personalized Consultation", desc: "A solution tailored to your needs" },
    { Icon: BadgeCheck, title: "No Commitment", desc: "First consultation is free" },
  ];
  return (
    <div className={styles.strip}>
      {items.map((i) => (
        <div key={i.title} className={styles.stripItem}>
          <i.Icon className={styles.stripIcon} />
          <div>
            <div className={styles.stripTitle}>{i.title}</div>
            <div className={styles.stripDesc}>{i.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
