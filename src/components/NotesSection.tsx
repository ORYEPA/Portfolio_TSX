import React from 'react';
import styles from '../styles/NotesSection.module.css';

export function NotesSection() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Notes &amp; Thoughts</h1>
        <p className={styles.subtitle}>
          Random thoughts, insights, and learnings from my journey as a developer.
        </p>
      </header>

      <div className={styles.iframeWrapper}>
        <iframe
          src="https://aidenn.notion.site/ebd/2489baff500780808bb1f17f9994b31a?v=2489baff500780bf8fd6000cc7dc9fc0"
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
          title="Embedded Notion Notes"
        />
      </div>
    </section>
  );
}
