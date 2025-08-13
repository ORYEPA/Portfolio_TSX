// src/components/ServicesSection.tsx
import { useEffect, useState } from "react";
import { loadServices, Service } from "../services/loadServices";
import ServiceCard from "./ServiceCard";
import styles from "../styles/ServicesSection.module.css";
import MyProcessSection from "./ProcessSection";

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices().then(setServices).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className={styles.section}><div className={styles.loading}>Loading services…</div></section>;
  }

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>Services</h2>
        <p className={styles.subtitle}>
          From concept to deployment, I offer comprehensive development services to bring your digital
          ideas to life. Let’s build something amazing together with modern technologies and best
          practices.
        </p>
      </header>

      <div className={styles.grid}>
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>

        <MyProcessSection />

    </section>
  );
}
