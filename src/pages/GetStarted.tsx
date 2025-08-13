import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/GetStarted.module.css"

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function GetStarted() {
  const q = useQuery();
  const serviceSlug = q.get("service") ?? "";
  const defaultSubject = serviceSlug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>Get Started</h2>
        <p className={styles.subtitle}>
          Tell me about your idea. I’ll get back to you shortly.
        </p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const data = new FormData(form);
            const payload = Object.fromEntries(data.entries());
            console.log("Form payload:", payload);
            alert("Thanks! Your request has been sent.");
            form.reset();
          }}
        >
          <div className={styles.row}>
            <label>Full Name</label>
            <input name="name" placeholder="Your name" required />
          </div>

          <div className={styles.row}>
            <label>Email</label>
            <input name="email" type="email" placeholder="you@email.com" required />
          </div>

          <div className={styles.row}>
            <label>Subject</label>
            <input name="subject" defaultValue={defaultSubject} />
          </div>

          <div className={styles.row}>
            <label>Selected Service</label>
            <input name="service" defaultValue={serviceSlug} readOnly />
          </div>

          <div className={styles.row}>
            <label>Main Idea</label>
            <textarea name="idea" rows={5} placeholder="Briefly describe what you need…" />
          </div>

          <div className={styles.rowInline}>
            <div className={styles.row}>
              <label>Preferred Date</label>
              <input name="date" type="date" />
            </div>
            <div className={styles.row}>
              <label>Preferred Time</label>
              <input name="time" type="time" />
            </div>
          </div>

          <button type="submit" className={styles.submit}>Send Request</button>
        </form>
      </div>
    </section>
  );
}
