// src/components/Resume.tsx
import { useEffect, useState } from "react";
import { loadEducation, loadExperience, type Entry } from "../../services/resumeLoader";
import { GraduationCap, Briefcase } from "lucide-react";
import styles from "../../styles/Resume.module.css";

type IconType = React.ComponentType<{ className?: string }>;

function Details({ details }: { details?: string | string[] }) {
  if (!details) return null;
  if (Array.isArray(details)) {
    return (
      <ul className={styles.cardList}>
        {details.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
    );
  }
  return <p className={styles.cardBody}>{details}</p>;
}

function Section({
  icon: Icon,
  title,
  items,
  loading,
  error,
}: {
  icon: IconType;
  title: string;
  items: Entry[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <Icon className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
      </header>

      <div className={styles.list}>
        {loading && (
          <div className={styles.card}><p className={styles.cardBody}>Loading…</p></div>
        )}

        {!loading && error && (
          <div className={styles.card}><p className={styles.cardBody}>⚠️ {error}</p></div>
        )}

        {!loading && !error && !items.length && (
          <div className={styles.card}><p className={styles.cardBody}>No data found.</p></div>
        )}

        {!loading && !error && items.map((e, i) => (
          <article key={`${e.title}-${e.org}-${e.start}-${i}`} className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <h3 className={styles.cardTitle}>{e.title}</h3>
                <div className={styles.cardOrg}>{e.org}</div>
                {(e.location || e.tag) && (
                  <div className={styles.metaRow}>
                    {e.location && <span className={styles.meta}>{e.location}</span>}
                    {e.location && e.tag && <span className={styles.dot}>&middot;</span>}
                    {e.tag && <span className={styles.meta}>{e.tag}</span>}
                  </div>
                )}
              </div>
              <div className={styles.badge}>
                {e.start} <span className={styles.badgeDash}>—</span> {e.end}
              </div>
            </div>
            <Details details={e.details as any} />
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Resume() {
  const [education, setEducation] = useState<Entry[]>([]);
  const [experience, setExperience] = useState<Entry[]>([]);
  const [loadingEdu, setLoadingEdu] = useState(true);
  const [loadingExp, setLoadingExp] = useState(true);
  const [errEdu, setErrEdu] = useState<string | null>(null);
  const [errExp, setErrExp] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await loadEducation();
        if (alive) setEducation(data);
      } catch (e: any) {
        if (alive) setErrEdu(e?.message ?? "Error loading education");
        console.error("Education error:", e);
      } finally {
        if (alive) setLoadingEdu(false);
      }
    })();

    (async () => {
      try {
        const data = await loadExperience();
        if (alive) setExperience(data);
      } catch (e: any) {
        if (alive) setErrExp(e?.message ?? "Error loading experience");
        console.error("Experience error:", e);
      } finally {
        if (alive) setLoadingExp(false);
      }
    })();

    return () => { alive = false; };
  }, []);

  return (
    <>
      <Section icon={GraduationCap} title="Education" items={education} loading={loadingEdu} error={errEdu} />
      <Section icon={Briefcase} title="Experience" items={experience} loading={loadingExp} error={errExp} />
    </>
  );
}
