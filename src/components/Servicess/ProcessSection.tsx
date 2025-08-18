import { motion } from "framer-motion";
import styles from "../../styles/MyProcessSection.module.css";
import { Search, CalendarRange, Code2, CheckCheck, Rocket } from "lucide-react";

const steps = [
  { n: "01", title: "Discovery",   desc: "Understanding your needs and project requirements", Icon: Search },
  { n: "02", title: "Planning",    desc: "Creating detailed project roadmap and timeline",    Icon: CalendarRange },
  { n: "03", title: "Development", desc: "Building your solution with regular updates",       Icon: Code2 },
  { n: "04", title: "Testing",     desc: "Thorough testing and quality assurance",            Icon: CheckCheck },
  { n: "05", title: "Deployment",  desc: "Launch and ongoing support",                        Icon: Rocket },
];

export default function MyProcessSection() {
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>My Process</h3>
      <p className={styles.subtitle}>
        A proven workflow that ensures quality results and keeps you informed every step of the way.
      </p>

      <ol className={styles.timeline} role="list">
        <div className={styles.connector} aria-hidden />
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            className={styles.step}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <div className={styles.bullet}>
              <s.Icon className={styles.bulletIcon} size={18} />
            </div>

            <motion.div
              className={`${styles.card} ${styles.gradient}`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 20, mass: 0.6 }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.numBadge}>{s.n}</span>
                <div className={styles.stepTitle}>{s.title}</div>
              </div>
              <div className={styles.stepDesc}>{s.desc}</div>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
